import { Navigate, useRoutes } from "react-router-dom";
import { SourceLayout } from "./SourceLayout";
import { DiatonicChordsPage } from "../features/harmony/DiatonicChordsPage";
import { ChordLibraryPage } from "../features/harmony/ChordLibraryPage";
import { VoicingsPage } from "../features/harmony/VoicingsPage";
import { CircleOfFifthsPage } from "../features/harmony/CircleOfFifthsPage";
import { ScaleLibraryPage } from "../features/scales/ScaleLibraryPage";
import { ProgressionsPage } from "../features/progressions/ProgressionsPage";
import { FinderPage } from "../features/finder/FinderPage";
import { IntervalsPage } from "../features/tools/IntervalsPage";
import { KeyDistancePage } from "../features/tools/KeyDistancePage";
import { InstrumentExplorerPage } from "../features/instruments/InstrumentExplorerPage";
import { MetronomePage } from "../features/performance/MetronomePage";
import { DrumMachinePage } from "../features/performance/DrumMachinePage";
import { EarTrainerPage } from "../features/performance/EarTrainerPage";
import { QuizPage } from "../features/learning/QuizPage";

export function AppRoutes() {
  return useRoutes([
    {
      path: "/",
      element: <Navigate to="/app/chords" replace />,
    },
    {
      path: "/app",
      element: <SourceLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/app/chords" replace />,
        },
        {
          path: "chords",
          element: <DiatonicChordsPage />,
        },
        {
          path: "allchords",
          element: <ChordLibraryPage />,
        },
        {
          path: "voicings",
          element: <VoicingsPage />,
        },
        {
          path: "circle",
          element: <CircleOfFifthsPage />,
        },
        {
          path: "modes",
          element: <ScaleLibraryPage variant="modes" />,
        },
        {
          path: "world",
          element: <ScaleLibraryPage variant="world" />,
        },
        {
          path: "progressions",
          element: <ProgressionsPage />,
        },
        {
          path: "finder",
          element: <FinderPage />,
        },
        {
          path: "intervals",
          element: <IntervalsPage />,
        },
        {
          path: "calculator",
          element: <KeyDistancePage />,
        },
        {
          path: "piano",
          element: <InstrumentExplorerPage />,
        },
        {
          path: "metronome",
          element: <MetronomePage />,
        },
        {
          path: "drums",
          element: <DrumMachinePage />,
        },
        {
          path: "ear",
          element: <EarTrainerPage />,
        },
        {
          path: "quiz",
          element: <QuizPage />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/app/chords" replace />,
    },
  ]);
}
