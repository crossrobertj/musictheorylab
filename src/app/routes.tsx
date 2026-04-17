import { Suspense, lazy, useEffect } from "react";
import type { ComponentType, ReactNode } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
import { SourceLayout } from "./SourceLayout";
import { useShellBridgeStore } from "./store/useShellBridgeStore";

function lazyNamed<TModule extends Record<string, unknown>, TName extends keyof TModule>(
  loader: () => Promise<TModule>,
  name: TName,
) {
  return lazy(async () => {
    const module = await loader();
    return { default: module[name] as ComponentType };
  });
}

const DiatonicChordsPage = lazyNamed(
  () => import("../features/harmony/DiatonicChordsPage"),
  "DiatonicChordsPage",
);
const ChordLibraryPage = lazyNamed(
  () => import("../features/harmony/ChordLibraryPage"),
  "ChordLibraryPage",
);
const VoicingsPage = lazyNamed(() => import("../features/harmony/VoicingsPage"), "VoicingsPage");
const CircleOfFifthsPage = lazyNamed(
  () => import("../features/harmony/CircleOfFifthsPage"),
  "CircleOfFifthsPage",
);
const ModalInterchangePage = lazyNamed(
  () => import("../features/harmony/ModalInterchangePage"),
  "ModalInterchangePage",
);
const ChordAnalyzerPage = lazyNamed(
  () => import("../features/harmony/ChordAnalyzerPage"),
  "ChordAnalyzerPage",
);
const AdvancedHarmonyPage = lazyNamed(
  () => import("../features/harmony/AdvancedHarmonyPage"),
  "AdvancedHarmonyPage",
);
const ModulationLabPage = lazyNamed(
  () => import("../features/harmony/ModulationLabPage"),
  "ModulationLabPage",
);
const ModesPage = lazy(async () => {
  const module = await import("../features/scales/ScaleLibraryPage");
  return { default: () => <module.ScaleLibraryPage variant="modes" /> };
});
const WorldScalesPage = lazy(async () => {
  const module = await import("../features/scales/ScaleLibraryPage");
  return { default: () => <module.ScaleLibraryPage variant="world" /> };
});
const ScaleBuilderPage = lazyNamed(
  () => import("../features/scales/ScaleBuilderPage"),
  "ScaleBuilderPage",
);
const ProgressionsPage = lazyNamed(
  () => import("../features/progressions/ProgressionsPage"),
  "ProgressionsPage",
);
const FinderPage = lazyNamed(() => import("../features/finder/FinderPage"), "FinderPage");
const GenreExplorerPage = lazyNamed(
  () => import("../features/exploration/GenreExplorerPage"),
  "GenreExplorerPage",
);
const MoodPickerPage = lazyNamed(
  () => import("../features/exploration/MoodPickerPage"),
  "MoodPickerPage",
);
const PhrasingPage = lazyNamed(() => import("../features/creative/PhrasingPage"), "PhrasingPage");
const StudioPage = lazyNamed(() => import("../features/creative/StudioPage"), "StudioPage");
const SongwritingLabPage = lazyNamed(
  () => import("../features/creative/SongwritingLabPage"),
  "SongwritingLabPage",
);
const IntervalsPage = lazyNamed(() => import("../features/tools/IntervalsPage"), "IntervalsPage");
const KeyDistancePage = lazyNamed(
  () => import("../features/tools/KeyDistancePage"),
  "KeyDistancePage",
);
const NotationWriterPage = lazyNamed(
  () => import("../features/tools/NotationWriterPage"),
  "NotationWriterPage",
);
const TablatureToolPage = lazyNamed(
  () => import("../features/tools/TablatureToolPage"),
  "TablatureToolPage",
);
const InstrumentExplorerPage = lazyNamed(
  () => import("../features/instruments/InstrumentExplorerPage"),
  "InstrumentExplorerPage",
);
const MicrotonalLabPage = lazyNamed(
  () => import("../features/tuning/MicrotonalLabPage"),
  "MicrotonalLabPage",
);
const CustomTuningPage = lazyNamed(
  () => import("../features/tuning/CustomTuningPage"),
  "CustomTuningPage",
);
const MetronomePage = lazyNamed(
  () => import("../features/performance/MetronomePage"),
  "MetronomePage",
);
const DrumMachinePage = lazyNamed(
  () => import("../features/performance/DrumMachinePage"),
  "DrumMachinePage",
);
const EarTrainerPage = lazyNamed(
  () => import("../features/performance/EarTrainerPage"),
  "EarTrainerPage",
);
const RhythmicLabPage = lazyNamed(
  () => import("../features/performance/RhythmicLabPage"),
  "RhythmicLabPage",
);
const QuizPage = lazyNamed(() => import("../features/learning/QuizPage"), "QuizPage");
const TheoryGuidePage = lazyNamed(
  () => import("../features/learning/TheoryGuidePage"),
  "TheoryGuidePage",
);
const FavoritesPage = lazyNamed(
  () => import("../features/learning/FavoritesPage"),
  "FavoritesPage",
);
const LearningPathsPage = lazyNamed(
  () => import("../features/learning/LearningPathsPage"),
  "LearningPathsPage",
);
const GrimoirePage = lazyNamed(
  () => import("../features/learning/GrimoirePage"),
  "GrimoirePage",
);
const MixingGuidePage = lazyNamed(
  () => import("../features/learning/MixingGuidePage"),
  "MixingGuidePage",
);
const RecordingGuidePage = lazyNamed(
  () => import("../features/learning/RecordingGuidePage"),
  "RecordingGuidePage",
);

function RouteShellState({
  subtitle,
  title,
}: {
  title: string;
  subtitle: string;
}) {
  const location = useLocation();
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);

  const match = location.pathname.match(/\/app\/([^/]+)/);
  const routeId = match?.[1] ?? null;

  useEffect(() => {
    if (!routeId) return;
    updateRoute(routeId, { title, subtitle });
  }, [routeId, subtitle, title, updateRoute]);

  return null;
}

function RouteLoadingFallback() {
  return (
    <section className="page-section">
      <RouteShellState
        subtitle="Route-level chunks are being loaded on demand."
        title="Loading Feature"
      />
      <div className="page-hero">
        <div>
          <span className="eyebrow">Loading</span>
          <h1>Loading feature…</h1>
          <p>Route-level chunks are loaded on demand to keep the initial app shell lighter.</p>
        </div>
      </div>
      <article className="detail-card route-loading-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Lazy Route</span>
            <h2>Fetching feature bundle</h2>
            <p>The current page module is being loaded.</p>
          </div>
        </div>
      </article>
    </section>
  );
}

function NotFoundPage() {
  return (
    <section className="page-section">
      <RouteShellState
        subtitle="The current URL does not map to a source-side feature."
        title="Route Not Found"
      />
      <div className="page-hero">
        <div>
          <span className="eyebrow">Not Found</span>
          <h1>That feature route does not exist</h1>
          <p>
            The current URL does not map to a source-side page. Use the navigation to jump back
            into the lab.
          </p>
        </div>
      </div>
      <article className="detail-card route-loading-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Route Error</span>
            <h2>Return to the source app</h2>
            <p>Try `/app/chords`, `/app/finder`, or another feature from the sidebar.</p>
          </div>
        </div>
      </article>
    </section>
  );
}

function withLazyPage(element: ReactNode) {
  return <Suspense fallback={<RouteLoadingFallback />}>{element}</Suspense>;
}

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
          element: withLazyPage(<DiatonicChordsPage />),
        },
        {
          path: "allchords",
          element: withLazyPage(<ChordLibraryPage />),
        },
        {
          path: "voicings",
          element: withLazyPage(<VoicingsPage />),
        },
        {
          path: "circle",
          element: withLazyPage(<CircleOfFifthsPage />),
        },
        {
          path: "modes",
          element: withLazyPage(<ModesPage />),
        },
        {
          path: "world",
          element: withLazyPage(<WorldScalesPage />),
        },
        {
          path: "scalebuilder",
          element: withLazyPage(<ScaleBuilderPage />),
        },
        {
          path: "progressions",
          element: withLazyPage(<ProgressionsPage />),
        },
        {
          path: "finder",
          element: withLazyPage(<FinderPage />),
        },
        {
          path: "genres",
          element: withLazyPage(<GenreExplorerPage />),
        },
        {
          path: "moods",
          element: withLazyPage(<MoodPickerPage />),
        },
        {
          path: "phrasing",
          element: withLazyPage(<PhrasingPage />),
        },
        {
          path: "studio",
          element: withLazyPage(<StudioPage />),
        },
        {
          path: "songwriting",
          element: withLazyPage(<SongwritingLabPage />),
        },
        {
          path: "intervals",
          element: withLazyPage(<IntervalsPage />),
        },
        {
          path: "interchange",
          element: withLazyPage(<ModalInterchangePage />),
        },
        {
          path: "chordanalyzer",
          element: withLazyPage(<ChordAnalyzerPage />),
        },
        {
          path: "harmony",
          element: withLazyPage(<AdvancedHarmonyPage />),
        },
        {
          path: "modulate",
          element: withLazyPage(<ModulationLabPage />),
        },
        {
          path: "calculator",
          element: withLazyPage(<KeyDistancePage />),
        },
        {
          path: "notation",
          element: withLazyPage(<NotationWriterPage />),
        },
        {
          path: "tablature",
          element: withLazyPage(<TablatureToolPage />),
        },
        {
          path: "piano",
          element: withLazyPage(<InstrumentExplorerPage />),
        },
        {
          path: "microtonal",
          element: withLazyPage(<MicrotonalLabPage />),
        },
        {
          path: "customtuning",
          element: withLazyPage(<CustomTuningPage />),
        },
        {
          path: "metronome",
          element: withLazyPage(<MetronomePage />),
        },
        {
          path: "drums",
          element: withLazyPage(<DrumMachinePage />),
        },
        {
          path: "rhythmic",
          element: withLazyPage(<RhythmicLabPage />),
        },
        {
          path: "ear",
          element: withLazyPage(<EarTrainerPage />),
        },
        {
          path: "quiz",
          element: withLazyPage(<QuizPage />),
        },
        {
          path: "learning",
          element: withLazyPage(<LearningPathsPage />),
        },
        {
          path: "guide",
          element: withLazyPage(<TheoryGuidePage />),
        },
        {
          path: "grimoire",
          element: withLazyPage(<GrimoirePage />),
        },
        {
          path: "mixing",
          element: withLazyPage(<MixingGuidePage />),
        },
        {
          path: "recording",
          element: withLazyPage(<RecordingGuidePage />),
        },
        {
          path: "favorites",
          element: withLazyPage(<FavoritesPage />),
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/app/chords" replace />,
    },
  ]);
}
