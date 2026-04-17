import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  getAdjacentSourceFeatures,
  getFeatureDefinition,
  getShellSections,
  shellFeatures,
} from "./featureRegistry";
import { LegacyHeader } from "./shell/LegacyHeader";
import { LegacyInstrumentStrip } from "./shell/LegacyInstrumentStrip";
import { LegacyPlaybackBar } from "./shell/LegacyPlaybackBar";
import { LegacySidebar } from "./shell/LegacySidebar";
import { useAppStore } from "./store/useAppStore";
import { useCustomInstrumentStore } from "./store/useCustomInstrumentStore";
import { useLearningStore } from "./store/useLearningStore";
import { useShellBridgeStore } from "./store/useShellBridgeStore";
import { stopAllAudio, unlockAudio, playChord } from "../audio/audioEngine";
import { KEY_OPTIONS } from "../domain/generated/theory-data";
import { getGroupedInstrumentEntries, getInstrumentConfig } from "../domain/instruments";
import { getRootFromKey } from "../domain/music";

function getRouteFeatureId(pathname: string) {
  const match = pathname.match(/\/app\/([^/]+)/);
  return match?.[1] ?? null;
}

export function SourceLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [shellMetronomeEnabled, setShellMetronomeEnabled] = useState(false);

  const currentFeatureId = useMemo(() => getRouteFeatureId(location.pathname), [location.pathname]);
  const activeFeature = useMemo(
    () => getFeatureDefinition(currentFeatureId),
    [currentFeatureId],
  );
  const { previousFeature, nextFeature } = useMemo(
    () => getAdjacentSourceFeatures(currentFeatureId),
    [currentFeatureId],
  );
  const shellSections = useMemo(() => getShellSections(), []);

  const currentKey = useAppStore((state) => state.currentKey);
  const currentInstrument = useAppStore((state) => state.currentInstrument);
  const tempo = useAppStore((state) => state.tempo);
  const soundEnabled = useAppStore((state) => state.soundEnabled);
  const setCurrentView = useAppStore((state) => state.setCurrentView);
  const setCurrentKey = useAppStore((state) => state.setCurrentKey);
  const setCurrentInstrument = useAppStore((state) => state.setCurrentInstrument);
  const setTempo = useAppStore((state) => state.setTempo);
  const setSoundEnabled = useAppStore((state) => state.setSoundEnabled);

  const customInstruments = useCustomInstrumentStore((state) => state.customInstruments);
  const xp = useLearningStore((state) => state.xp);
  const level = useLearningStore((state) => state.level);
  const resetProgress = useLearningStore((state) => state.resetProgress);

  const shellTitle = useShellBridgeStore((state) => state.title);
  const shellSubtitle = useShellBridgeStore((state) => state.subtitle);
  const playableLabel = useShellBridgeStore((state) => state.playableLabel);
  const playableNoteSet = useShellBridgeStore((state) => state.playableNoteSet);
  const playCurrent = useShellBridgeStore((state) => state.playCurrent);
  const clear = useShellBridgeStore((state) => state.clear);
  const instrumentPanelCollapsed = useShellBridgeStore((state) => state.instrumentPanelCollapsed);
  const degreeMode = useShellBridgeStore((state) => state.degreeMode);
  const labelAll = useShellBridgeStore((state) => state.labelAll);
  const arpeggioMode = useShellBridgeStore((state) => state.arpeggioMode);
  const strumSpeed = useShellBridgeStore((state) => state.strumSpeed);
  const drone = useShellBridgeStore((state) => state.drone);
  const syncRoute = useShellBridgeStore((state) => state.syncRoute);
  const setInstrumentPanelCollapsed = useShellBridgeStore(
    (state) => state.setInstrumentPanelCollapsed,
  );
  const setDegreeMode = useShellBridgeStore((state) => state.setDegreeMode);
  const setLabelAll = useShellBridgeStore((state) => state.setLabelAll);
  const setArpeggioMode = useShellBridgeStore((state) => state.setArpeggioMode);
  const setStrumSpeed = useShellBridgeStore((state) => state.setStrumSpeed);
  const setDrone = useShellBridgeStore((state) => state.setDrone);

  const currentInstrumentConfig = useMemo(
    () => getInstrumentConfig(currentInstrument, customInstruments),
    [currentInstrument, customInstruments],
  );
  const groupedInstrumentEntries = useMemo(
    () => getGroupedInstrumentEntries(customInstruments),
    [customInstruments],
  );

  const resolvedTitle =
    (shellTitle ?? "") || activeFeature?.legacyTitle || activeFeature?.label || "Music Theory Lab";
  const resolvedSubtitle =
    (shellSubtitle ?? "") ||
    activeFeature?.subtitle ||
    activeFeature?.description ||
    `Explore the current selection in ${currentKey}.`;
  const resolvedPlayableLabel = playableLabel ?? "";
  const resolvedPlayableNoteSet = playableNoteSet ?? [];
  const resolvedPlayCurrent = playCurrent ?? null;
  const resolvedClear = clear ?? null;
  const resolvedInstrumentPanelCollapsed = instrumentPanelCollapsed ?? false;
  const resolvedDegreeMode = degreeMode ?? false;
  const resolvedLabelAll = labelAll ?? false;
  const resolvedArpeggioMode = arpeggioMode ?? false;
  const resolvedStrumSpeed = strumSpeed ?? 120;
  const resolvedDrone = drone ?? false;
  const canPlayCurrent = Boolean(resolvedPlayCurrent || resolvedPlayableNoteSet.length);
  const clearDisabled = !resolvedClear;

  useLayoutEffect(() => {
    if (!currentFeatureId) return;

    setCurrentView(currentFeatureId);
    syncRoute(currentFeatureId, {
      title: activeFeature?.legacyTitle ?? activeFeature?.label ?? "Music Theory Lab",
      subtitle:
        activeFeature?.subtitle ??
        activeFeature?.description ??
        `Explore the current selection in ${currentKey}.`,
      playableLabel: "",
      playableNoteSet: [],
      playCurrent: null,
      clear: null,
    });
  }, [activeFeature, currentFeatureId, setCurrentView, syncRoute]);

  useEffect(() => {
    document.title = resolvedTitle ? `${resolvedTitle} | Music Theory Lab` : "Music Theory Lab";
  }, [resolvedTitle]);

  function handlePlayCurrent() {
    void unlockAudio();

    if (resolvedPlayCurrent) {
      resolvedPlayCurrent();
      return;
    }

    if (resolvedPlayableNoteSet.length) {
      playChord(resolvedPlayableNoteSet, { arpeggio: resolvedArpeggioMode });
    }
  }

  function handleStopAll() {
    setShellMetronomeEnabled(false);
    setDrone(false);
    stopAllAudio();
  }

  function handleSurpriseMe() {
    const randomFeature = shellFeatures[Math.floor(Math.random() * shellFeatures.length)];
    const randomKey = KEY_OPTIONS[Math.floor(Math.random() * KEY_OPTIONS.length)];

    setCurrentKey(randomKey);
    navigate(`/app/${randomFeature.id}`);
  }

  function goToFeature(featureId: string | null | undefined) {
    if (!featureId) return;
    navigate(`/app/${featureId}`);
  }

  return (
    <div className="legacy-shell" onPointerDownCapture={() => void unlockAudio()}>
      <LegacySidebar sections={shellSections} />

      <div className="legacy-main-pane">
        <LegacyHeader
          currentKey={currentKey}
          level={level}
          nextFeature={nextFeature}
          onNextFeature={() => goToFeature(nextFeature?.id)}
          onPreviousFeature={() => goToFeature(previousFeature?.id)}
          onResetProgress={resetProgress}
          onSelectKey={setCurrentKey}
          onStopAll={handleStopAll}
          onSurpriseMe={handleSurpriseMe}
          previousFeature={previousFeature}
          subtitle={resolvedSubtitle}
          title={resolvedTitle}
          xp={xp}
        />

        <LegacyInstrumentStrip
          clearDisabled={clearDisabled}
          currentInstrument={currentInstrument}
          currentInstrumentConfig={currentInstrumentConfig}
          degreeMode={resolvedDegreeMode}
          instrumentGroups={groupedInstrumentEntries}
          instrumentPanelCollapsed={resolvedInstrumentPanelCollapsed}
          labelAll={resolvedLabelAll}
          onClear={() => resolvedClear?.()}
          onSelectInstrument={setCurrentInstrument}
          onSetDegreeMode={setDegreeMode}
          onSetLabelAll={setLabelAll}
          onToggleInstrumentPanel={() =>
            setInstrumentPanelCollapsed(!resolvedInstrumentPanelCollapsed)
          }
          playableLabel={
            resolvedPlayableLabel || `Key ${currentKey} • Root ${getRootFromKey(currentKey)}`
          }
        />

        <div
          className={`legacy-main-scroll ${
            resolvedInstrumentPanelCollapsed ? "legacy-main-scroll--instrument-collapsed" : ""
          }`}
        >
          <Outlet />
        </div>

        <LegacyPlaybackBar
          arpeggioMode={resolvedArpeggioMode}
          canPlayCurrent={canPlayCurrent}
          drone={resolvedDrone}
          metronomeEnabled={shellMetronomeEnabled}
          onPlayCurrent={handlePlayCurrent}
          onSetArpeggioMode={setArpeggioMode}
          onSetDrone={setDrone}
          onSetSoundEnabled={setSoundEnabled}
          onSetStrumSpeed={setStrumSpeed}
          onSetTempo={setTempo}
          onToggleMetronome={() => setShellMetronomeEnabled((current) => !current)}
          playableLabel={resolvedPlayableLabel}
          soundEnabled={soundEnabled}
          strumSpeed={resolvedStrumSpeed}
          tempo={tempo}
        />
      </div>
    </div>
  );
}
