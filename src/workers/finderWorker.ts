/// <reference lib="webworker" />

import {
  analyzeFinderSelection,
  type FinderWorkerRequest,
  type FinderWorkerResponse,
} from "../domain/finder";

self.onmessage = (event: MessageEvent<FinderWorkerRequest>) => {
  const message = event.data;

  if (message.type !== "analyze") return;

  try {
    const analysis = analyzeFinderSelection(message.noteClasses, {
      scaleLimit: message.scaleLimit,
      compatibleLimit: message.compatibleLimit,
    });

    const response: FinderWorkerResponse = {
      type: "result",
      requestId: message.requestId,
      analysis,
    };

    self.postMessage(response);
  } catch (error) {
    const response: FinderWorkerResponse = {
      type: "error",
      requestId: message.requestId,
      message: error instanceof Error ? error.message : "Unknown worker failure",
    };

    self.postMessage(response);
  }
};

export {};
