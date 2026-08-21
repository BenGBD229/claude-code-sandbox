import { interpolate, useCurrentFrame } from "remotion";
import { DUR, EASE_OUT_EXPO, fontFamily } from "../tokens";

// Text entry: mask (overflow-hidden clip) + slide-up. Never a fade alone.
export const MaskSlideText: React.FC<{
  appearFrame: number;
  fontSize: number;
  color: string;
  align?: "left" | "center" | "right";
  duration?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({
  appearFrame,
  fontSize,
  color,
  align = "left",
  duration = DUR.base,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const local = frame - appearFrame;

  const progress = interpolate(local, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT_EXPO,
  });

  const translateY = interpolate(progress, [0, 1], [1, 0]);
  const clip = interpolate(progress, [0, 1], [100, 0]);

  return (
    <div
      style={{
        // Only clip top/bottom for the mask reveal — no horizontal overflow
        // clip, so long unbreakable words/cartouches are never cut off.
        clipPath: `inset(0 -100vw ${clip}% -100vw)`,
        textAlign: align,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize,
          color,
          textTransform: "uppercase",
          lineHeight: 1.08,
          translate: `0 ${translateY * 100}%`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
