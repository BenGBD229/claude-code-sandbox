import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// The signature <FloatingPhone /> mockup (brief §1.4).
export const FloatingPhone: React.FC<{
  width: number;
  enterFrame?: number;
  children: React.ReactNode;
}> = ({ width, enterFrame, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const height = width * 2.05;

  // Permanent floating: desynced cycles per axis (never static).
  const floatY = Math.sin((frame / 160) * Math.PI * 2) * 12;
  const rotateZ = Math.sin((frame / 200) * Math.PI * 2) * 1.2;
  const rotateY = Math.sin((frame / 240) * Math.PI * 2) * 4;

  // Diagonal light sweep across the screen, 160f cycle.
  const sweepProgress = (frame % 160) / 160;
  const sweepPosition = interpolate(sweepProgress, [0, 1], [-130, 130]);

  let entryTranslateX = 0;
  let entryTranslateY = 0;
  let entryRotate = 0;

  if (enterFrame !== undefined) {
    const local = frame - enterFrame;
    const enterProgress = spring({
      frame: local,
      fps,
      config: { damping: 16, mass: 0.9 },
      durationInFrames: 22,
    });
    entryTranslateX = interpolate(enterProgress, [0, 1], [width * 0.5, 0]);
    entryTranslateY = interpolate(enterProgress, [0, 1], [height * 0.35, 0]);
    entryRotate = interpolate(enterProgress, [0, 1], [8, 2]);
  }

  return (
    <div
      style={{
        width,
        height,
        translate: `${entryTranslateX}px ${entryTranslateY + floatY}px`,
        rotate: `${rotateZ + entryRotate}deg`,
        transform: `rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 54,
          backgroundColor: "#1B1E24",
          border: "3px solid #2A2E36",
          boxShadow: "0 50px 110px rgba(0,0,0,0.45)",
          padding: width * 0.035,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: 42,
            overflow: "hidden",
            backgroundColor: "#000",
          }}
        >
          {children}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: `${sweepPosition}%`,
              width: "40%",
              height: "100%",
              background:
                "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
};
