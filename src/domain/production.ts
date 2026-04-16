export interface MixingInstrumentProfile {
  name: string;
  role: string;
  freq: string;
  eq: string;
  comp: string;
  pan: string;
  space: string;
  chain: string;
  pitfalls: string;
}

export interface MixingFamily {
  family: string;
  instruments: MixingInstrumentProfile[];
}

export interface RecordingChecklistItem {
  id: string;
  task: string;
  tip: string;
}

export interface RecordingGenreGuide {
  genre: string;
  before: string;
  during: string;
  after: string;
}

export const MIXING_GUIDE_LIBRARY: MixingFamily[] = [
  {
    family: "Drums",
    instruments: [
      {
        name: "Kick",
        role: "Low-end anchor",
        freq: "45-80Hz thump, 2-4kHz click",
        eq: "HPF 25-30Hz. Small cut around 250Hz for mud. Boost 60Hz or 3kHz as needed.",
        comp: "4:1, attack 20-35ms, release 60-120ms, 3-6dB GR.",
        pan: "Center",
        space: "Very short room or dry.",
        chain: "Gate -> EQ -> Compressor -> Saturation",
        pitfalls: "Too much sub masks bass; too much click sounds plastic.",
      },
      {
        name: "Snare",
        role: "Backbeat definition",
        freq: "150-250Hz body, 2-6kHz crack, 8-10kHz air",
        eq: "Cut boxiness 400-700Hz. Presence boost 3-5kHz.",
        comp: "3-5:1, attack 10-20ms, release 70-150ms.",
        pan: "Center or slight side in overhead context",
        space: "Plate/room 0.6-1.2s.",
        chain: "EQ -> Compressor -> Transient -> Reverb send",
        pitfalls: "Over-compression kills transient; ring can dominate vocal range.",
      },
      {
        name: "Hi-Hats/Cymbals",
        role: "Top-end motion",
        freq: "6-14kHz",
        eq: "HPF 300-500Hz. Tame harsh peaks near 8-10kHz.",
        comp: "Light or none; use dynamic EQ for harshness.",
        pan: "Wider than kick/snare",
        space: "Short bright room.",
        chain: "EQ -> De-esser/dyn EQ -> Saturation",
        pitfalls: "Harsh hats cause listener fatigue quickly.",
      },
    ],
  },
  {
    family: "Bass",
    instruments: [
      {
        name: "Electric Bass",
        role: "Low-end note support",
        freq: "40-120Hz fundamentals, 700Hz-2kHz definition",
        eq: "HPF 30Hz. Shape 80Hz pocket with kick. Add 1kHz for articulation.",
        comp: "4:1, medium attack/release, 4-8dB GR.",
        pan: "Center",
        space: "Mostly dry.",
        chain: "EQ -> Compressor -> Saturation -> Sidechain from kick",
        pitfalls: "Competing with kick, undefined note attacks.",
      },
      {
        name: "808/Sub Bass",
        role: "Sub foundation and weight",
        freq: "30-70Hz core, optional 150-300Hz harmonics",
        eq: "Control 20-30Hz rumble. Add harmonics for small speakers.",
        comp: "Usually clip/saturate before compression.",
        pan: "Center mono",
        space: "Dry.",
        chain: "Saturation -> Clipper -> Dynamic EQ -> Sidechain",
        pitfalls: "Long tails smear groove and mask kick/transients.",
      },
    ],
  },
  {
    family: "Guitars",
    instruments: [
      {
        name: "Rhythm Guitar",
        role: "Midrange energy and groove",
        freq: "120Hz-6kHz",
        eq: "HPF 80-120Hz, LPF 8-10kHz. Carve 2-4kHz against vocal.",
        comp: "2-3:1 gentle leveling.",
        pan: "Dual-track hard L/R for width",
        space: "Short room/slap.",
        chain: "Amp tone -> EQ -> Light comp -> Stereo bus",
        pitfalls: "Too bright fights vocal; too wide collapses mono if phasey.",
      },
      {
        name: "Lead Guitar",
        role: "Hook/melody spotlight",
        freq: "200Hz-8kHz",
        eq: "Presence bump 2-5kHz, control fizz >8kHz.",
        comp: "3:1 with slower attack for sustain.",
        pan: "Center or offset opposite lead vocal ad-libs",
        space: "Delay + plate blend.",
        chain: "EQ -> Compressor -> Delay/Reverb",
        pitfalls: "Overly wet lead loses focus.",
      },
    ],
  },
  {
    family: "Keys/Synths",
    instruments: [
      {
        name: "Piano",
        role: "Harmony and transient rhythm",
        freq: "80Hz-10kHz",
        eq: "HPF 60-90Hz if bass-heavy mix. Reduce 2-4kHz if clashing with vocal.",
        comp: "Light bus compression 2:1.",
        pan: "Stereo; narrow if mix crowded.",
        space: "Room/plate tailored to genre.",
        chain: "EQ -> Compression -> Stereo imaging",
        pitfalls: "Wide low end muddies center.",
      },
      {
        name: "Pads/Synth Chords",
        role: "Glue and atmosphere",
        freq: "100Hz-12kHz",
        eq: "HPF 120Hz often. Dynamic cuts where vocal sits.",
        comp: "Minimal; automation preferred.",
        pan: "Wide but mono-compatible.",
        space: "Longer reverbs, synced delays.",
        chain: "EQ -> Modulation -> Reverb -> Sidechain",
        pitfalls: "Masks lyrics due to sustained mids.",
      },
      {
        name: "Synth Lead/Arp",
        role: "Motion and hooks",
        freq: "200Hz-12kHz",
        eq: "Control resonances, keep 2-4kHz lane clear for vocal.",
        comp: "Light peak control or clip.",
        pan: "Center for lead, wider for arps.",
        space: "Tempo-synced delay.",
        chain: "EQ -> Saturation -> Delay",
        pitfalls: "Piercing resonance around 2-3kHz.",
      },
    ],
  },
  {
    family: "Vocals",
    instruments: [
      {
        name: "Lead Vocal",
        role: "Primary narrative focus",
        freq: "100Hz-12kHz",
        eq: "HPF 70-100Hz. Tame mud 200-350Hz, add presence 3-5kHz, air 10-14kHz.",
        comp: "Stage compression (slow then fast) totaling 5-10dB GR.",
        pan: "Center",
        space: "Short verb + timed delay.",
        chain: "Tune -> Subtractive EQ -> De-esser -> Compression -> Additive EQ -> FX sends",
        pitfalls: "Sibilance and consonant loss after heavy de-essing.",
      },
      {
        name: "Background Vocals",
        role: "Support and width",
        freq: "150Hz-10kHz",
        eq: "More HPF than lead, less 3kHz presence.",
        comp: "More aggressive leveling than lead.",
        pan: "Spread stacks; keep low BGV closer.",
        space: "Slightly wetter than lead.",
        chain: "EQ -> Compression -> Stereo spread -> Reverb",
        pitfalls: "BGV masks lead if too loud or bright.",
      },
    ],
  },
  {
    family: "Orchestral/Acoustic",
    instruments: [
      {
        name: "Strings",
        role: "Emotion and movement",
        freq: "120Hz-12kHz",
        eq: "Reduce 250-450Hz cloud. Control 2-4kHz scratch.",
        comp: "Minimal; use volume rides.",
        pan: "Section-based stereo image",
        space: "Hall reverb with predelay.",
        chain: "EQ -> Saturation -> Reverb bus",
        pitfalls: "Too much hall smears rhythm.",
      },
      {
        name: "Brass/Woodwinds",
        role: "Accent and punch",
        freq: "150Hz-10kHz",
        eq: "Control harsh bands 2-5kHz. HPF by role.",
        comp: "Moderate on close mics.",
        pan: "Sectional placement.",
        space: "Room or hall.",
        chain: "EQ -> Compression -> Reverb",
        pitfalls: "Brass brightness can overpower lead vocal.",
      },
      {
        name: "Acoustic Guitar",
        role: "Texture and rhythm",
        freq: "90Hz-12kHz",
        eq: "HPF 80-120Hz. Cut boom 180-280Hz. Tame pick noise 2-4kHz.",
        comp: "2-4:1 gentle.",
        pan: "Mono off-center or stereo pair.",
        space: "Short room.",
        chain: "EQ -> Compressor -> Saturation",
        pitfalls: "Boomy lows and string squeak clutter mids.",
      },
    ],
  },
];

export const RECORDING_CHECKLIST: Record<"before" | "during" | "after", RecordingChecklistItem[]> = {
  before: [
    { id: "pre-goal", task: "Define production target and references", tip: "Pick 2-3 reference records for tone, arrangement density, and vocal placement." },
    { id: "pre-songmap", task: "Finalize arrangement map", tip: "Lock section lengths, transitions, and tempo map before heavy tracking." },
    { id: "pre-session", task: "Create DAW session template", tip: "Color-code tracks, pre-route buses, set marker map, and print rough cue mix." },
    { id: "pre-tech", task: "Technical readiness check", tip: "Confirm sample rate/bit depth, interface clock, and disk space for full session duration." },
    { id: "pre-room", task: "Room and monitoring setup", tip: "Treat early reflections, reduce noise floor, and check mono compatibility." },
    { id: "pre-mics", task: "Mic and signal chain planning", tip: "Choose mic/preamp per source and set fallback options for fast swaps." },
    { id: "pre-gain", task: "Gain-stage with headroom", tip: "Track around -18 dBFS RMS, with peaks roughly -12 to -6 dBFS." },
    { id: "pre-latency", task: "Latency and monitoring strategy", tip: "Use low buffer and direct monitoring where needed; test performer cue comfort." },
    { id: "pre-perf", task: "Performer prep", tip: "Warmups, lyric/chord sheets, and take goals reduce studio decision fatigue." },
    { id: "pre-backup", task: "Redundancy plan", tip: "Auto-save plus mirrored session backup path before pressing record." },
  ],
  during: [
    { id: "dur-slate", task: "Slate and organize every take", tip: "Use clear take naming: section, pass, notes, comp rank." },
    { id: "dur-noise", task: "Watch noise and clipping continuously", tip: "Monitor HVAC bleed, plosives, cable crackle, and intersample peaks." },
    { id: "dur-cue", task: "Adjust cue mixes for performance", tip: "Prioritize timing anchors and remove distracting elements." },
    { id: "dur-comp", task: "Capture comp-ready coverage", tip: "Record full passes plus focused punch takes for difficult phrases." },
    { id: "dur-phase", task: "Check phase on multi-mic sources", tip: "Flip polarity and align close and room mics before committing many takes." },
    { id: "dur-edits", task: "Mark edit points live", tip: "Drop markers for tuning and timing fixes to speed post-session cleanup." },
    { id: "dur-energy", task: "Manage performer energy", tip: "Alternate high-demand takes with recovery passes to prevent tone drift." },
    { id: "dur-reference", task: "Periodic A/B with references", tip: "Level-match rough bounce against reference tracks every few major passes." },
    { id: "dur-print", task: "Print safety tracks when needed", tip: "Capture DI alongside processed tones for re-amping flexibility." },
    { id: "dur-log", task: "Session log discipline", tip: "Document best takes, plugin choices, and unresolved issues for handoff." },
  ],
  after: [
    { id: "post-comp", task: "Assemble and verify comps", tip: "Build clean comps first, then fix timing and tuning in musical context." },
    { id: "post-edit", task: "Edit cleanup pass", tip: "Trim silences, crossfade edits, remove pops and clicks, and align doubles tightly." },
    { id: "post-consol", task: "Consolidate and label tracks", tip: "Export consistent start-time stems with clear names for mixing or mastering." },
    { id: "post-rough", task: "Print rough mixes and alt versions", tip: "Bounce instrumental, TV, acapella, and short preview refs when useful." },
    { id: "post-notes", task: "Deliver production notes", tip: "Include arrangement intent, key processing decisions, and revision priorities." },
    { id: "post-backup", task: "Archive and backup", tip: "Create 3 copies: local, external, and cloud." },
    { id: "post-qc", task: "Quality-control listen", tip: "Check translation on speakers, headphones, phone, and in mono before signoff." },
    { id: "post-revision", task: "Revision triage", tip: "Classify notes into technical fixes, performance fixes, and creative direction changes." },
  ],
};

export const RECORDING_GENRE_GUIDE: RecordingGenreGuide[] = [
  { genre: "Pop", before: "Finalize hook placement and vocal key. Build a vocal-forward template with layered doubles and ad-libs lanes.", during: "Prioritize lead vocal emotion and consonant clarity. Capture doubles and stacks while tone is consistent.", after: "Comp vocals tightly, clean breaths strategically, and prep alt chorus stacks for mix options." },
  { genre: "Rock", before: "Pre-pro drum arrangement and guitar tone palette. Plan amp and room mic combinations.", during: "Track rhythm section for pocket first, then overdub texture and lead moments.", after: "Phase-align drums and guitars, tighten edits without killing feel, and preserve dynamics in roughs." },
  { genre: "Hip-Hop", before: "Lock tempo grid and 808 key center. Prep vocal chain with low-latency monitoring.", during: "Capture multiple cadence and tone passes in short blocks.", after: "Comp bars for flow continuity, clean sibilance and plosives, and print acapella and TV stems." },
  { genre: "R&B / Soul", before: "Design harmonic pocket and vocal arrangement map with lead, harmonies, and call/response.", during: "Track expressive lead takes first, then harmonic layers with tuning discipline.", after: "Fine-edit vocal timing between harmony stacks and preserve intentional rubato moments." },
  { genre: "EDM / Electronic", before: "Preselect sound palette and automation lanes. Plan topline range against drop energy.", during: "Record clean toplines and resample key motifs for later sound design.", after: "Consolidate stems for build and drop sections and print MIDI plus audio for sound recall." },
  { genre: "Country / Folk", before: "Decide storytelling focal point and acoustic instrument hierarchy.", during: "Capture full performance passes to preserve narrative phrasing and microdynamics.", after: "Use transparent editing, keep natural transients, and avoid over-quantizing performance feel." },
  { genre: "Jazz / Fusion", before: "Confirm chart versions and solo order. Set the room for ensemble communication.", during: "Track longer takes for interaction and minimize interruption unless technical issues occur.", after: "Select takes by musical arc, not perfection. Keep bleed coherent and phase-stable." },
  { genre: "Metal / Hardcore", before: "Tune drums and guitars meticulously and define the click map for tempo changes.", during: "Capture tight rhythm layers with consistent picking and re-amp-ready DIs.", after: "Edit guitars and drums with strict consistency and check low-end masking before mix handoff." },
  { genre: "Singer-Songwriter / Acoustic", before: "Choose key and capo strategy for vocal comfort and instrument resonance.", during: "Track guide vocal and instrument together when feel matters, then replace selectively.", after: "Keep natural ambience, reduce over-editing, and highlight lyric intelligibility." },
  { genre: "Latin / Afrobeat / World", before: "Map percussion roles and clave or timeline references clearly.", during: "Track rhythm section with strong timing reference and intentional interlocking parts.", after: "Preserve groove microtiming and avoid flattening human push/pull with heavy quantization." },
];

export function getRecordingProgress(
  phase: keyof typeof RECORDING_CHECKLIST,
  done: Record<string, boolean>,
) {
  const items = RECORDING_CHECKLIST[phase];
  const complete = items.filter((item) => done[item.id]).length;
  return {
    total: items.length,
    done: complete,
    pct: items.length ? Math.round((complete / items.length) * 100) : 0,
  };
}
