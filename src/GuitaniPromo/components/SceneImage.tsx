import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { LINEAR } from "../tokens";

// Full-bleed photo with a permanent slow push-in (brief §1.3: 1.00 -> 1.06).
export const SceneImage: React.FC<{
  src: string;
  spanFrames?: number;
  voile?: "bottom" | "full" | "none";
  voileOpacity?: number;
  style?: React.CSSProperties;
}> = ({ src, spanFrames = 300, voile = "none", voileOpacity = 0.4, style }) => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, spanFrames], [1, 1.06], {
    extrapolateRight: "clamp",
    easing: LINEAR,
  });

  return (
    <AbsoluteFill style={style}>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: `${scale}`,
        }}
      />
      {voile === "bottom" ? (
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 45%, rgba(0,0,0,0.8) 100%)",
          }}
        />
      ) : null}
      {voile === "full" ? (
        <AbsoluteFill style={{ backgroundColor: `rgba(0,0,0,${voileOpacity})` }} />
      ) : null}
    </AbsoluteFill>
  );
};
