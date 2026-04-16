import { useEffect, useMemo, useRef, useState } from "react";
import {
  analyzeFinderSelection,
  getUniqueNoteClasses,
  type FinderAnalysis,
  type FinderWorkerRequest,
  type FinderWorkerResponse,
} from "../../domain/finder";

const SCALE_LIMIT = 12;
const COMPATIBLE_LIMIT = 10;

interface FinderAnalysisState {
  analysis: FinderAnalysis;
  isLoading: boolean;
  engine: "worker" | "main";
  error: string | null;
}

function runSyncAnalysis(noteClasses: string[]) {
  return analyzeFinderSelection(noteClasses, {
    scaleLimit: SCALE_LIMIT,
    compatibleLimit: COMPATIBLE_LIMIT,
  });
}

export function useFinderAnalysis(selectedNotes: string[]) {
  const normalizedNotes = useMemo(() => getUniqueNoteClasses(selectedNotes), [selectedNotes]);
  const workerRef = useRef<Worker | null>(null);
  const latestRequestRef = useRef(0);
  const latestNotesRef = useRef(normalizedNotes);
  const [workerUnavailable, setWorkerUnavailable] = useState(false);
  const [state, setState] = useState<FinderAnalysisState>(() => ({
    analysis: runSyncAnalysis(normalizedNotes),
    isLoading: false,
    engine: "main",
    error: null,
  }));

  useEffect(() => {
    latestNotesRef.current = normalizedNotes;
  }, [normalizedNotes]);

  useEffect(() => {
    try {
      const worker = new Worker(new URL("../../workers/finderWorker.ts", import.meta.url), {
        type: "module",
      });

      worker.onmessage = (event: MessageEvent<FinderWorkerResponse>) => {
        const message = event.data;
        if (message.requestId !== latestRequestRef.current) return;

        if (message.type === "result") {
          setState({
            analysis: message.analysis,
            isLoading: false,
            engine: "worker",
            error: null,
          });
          return;
        }

        setWorkerUnavailable(true);
        setState({
          analysis: runSyncAnalysis(latestNotesRef.current),
          isLoading: false,
          engine: "main",
          error: message.message,
        });
      };

      worker.onerror = () => {
        setWorkerUnavailable(true);
      };

      workerRef.current = worker;

      return () => {
        worker.terminate();
        workerRef.current = null;
      };
    } catch {
      setWorkerUnavailable(true);
      return undefined;
    }
  }, []);

  useEffect(() => {
    if (workerUnavailable || !workerRef.current) {
      setState({
        analysis: runSyncAnalysis(normalizedNotes),
        isLoading: false,
        engine: "main",
        error: workerUnavailable ? "Worker unavailable, using main-thread matching." : null,
      });
      return;
    }

    const requestId = latestRequestRef.current + 1;
    latestRequestRef.current = requestId;

    setState((current) => ({
      ...current,
      isLoading: true,
      engine: "worker",
      error: null,
    }));

    const message: FinderWorkerRequest = {
      type: "analyze",
      requestId,
      noteClasses: normalizedNotes,
      scaleLimit: SCALE_LIMIT,
      compatibleLimit: COMPATIBLE_LIMIT,
    };

    workerRef.current.postMessage(message);
  }, [normalizedNotes, workerUnavailable]);

  return state;
}
