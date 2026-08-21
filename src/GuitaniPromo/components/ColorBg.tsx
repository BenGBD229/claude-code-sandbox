import { AbsoluteFill } from "remotion";
import { COLORS, Univers, universBg } from "../tokens";

export const ColorBg: React.FC<{ univers: Univers }> = ({ univers }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: universBg[univers] }}>
      {univers === "sombre" ? (
        <AbsoluteFill
          style={{
            background: `radial-gradient(circle at 50% 42%, ${COLORS.sombreHalo} 0%, ${COLORS.sombreHalo} 0%, transparent 62%)`,
            opacity: 0.5,
            filter: "blur(300px)",
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
