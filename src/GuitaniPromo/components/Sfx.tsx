import { Audio, Sequence, staticFile } from "remotion";

const SFX_FILES = {
  whoosh: "assets/audio/sfx/whoosh.mp3",
  pop: "assets/audio/sfx/pop.mp3",
  tick: "assets/audio/sfx/tick.mp3",
  impact: "assets/audio/sfx/impact.mp3",
  clavier: "assets/audio/sfx/clavier.mp3",
} as const;

// One-shot SFX cue at an absolute frame in the master timeline.
export const Sfx: React.FC<{
  type: keyof typeof SFX_FILES;
  at: number;
  volume?: number;
  durationInFrames?: number;
}> = ({ type, at, volume = 0.7, durationInFrames = 30 }) => {
  return (
    <Sequence from={at} durationInFrames={durationInFrames} layout="none">
      <Audio src={staticFile(SFX_FILES[type])} volume={volume} />
    </Sequence>
  );
};
