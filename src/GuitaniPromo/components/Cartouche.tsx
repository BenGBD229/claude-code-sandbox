import { interpolate, useCurrentFrame } from "remotion";
import { cartoucheColors, DUR, EASE_OUT_EXPO, fontFamily, Univers } from "../tokens";

export const Cartouche: React.FC<{
  univers: Univers;
  appearFrame: number;
  fontSize: number;
  children: React.ReactNode;
}> = ({ univers, appearFrame, fontSize, children }) => {
  const frame = useCurrentFrame();
  const local = frame - appearFrame;
  const colors = cartoucheColors[univers];

  const scaleX = interpolate(local, [0, DUR.fast], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT_EXPO,
  });

  // Text reveals once the cartouche is 60% open
  const textOpacity = interpolate(
    local,
    [DUR.fast * 0.6, DUR.fast],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <span
      style={{
        display: "inline-block",
        backgroundColor: colors.bg,
        color: colors.text,
        borderRadius: 12,
        padding: "12px 28px",
        fontFamily,
        fontWeight: 900,
        fontSize,
        textTransform: "uppercase",
        lineHeight: 1.05,
        scale: `${scaleX} 1`,
        transformOrigin: "left center",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ opacity: textOpacity }}>{children}</span>
    </span>
  );
};
