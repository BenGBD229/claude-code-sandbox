import { AbsoluteFill, Img, staticFile } from "remotion";

// Permanent film-grain overlay, opacity 0.04 (brief §1.3)
export const Grain: React.FC = () => {
  return (
    <AbsoluteFill style={{ opacity: 0.04, mixBlendMode: "overlay" }}>
      <Img
        src={staticFile("assets/images/g10_texture_grain.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </AbsoluteFill>
  );
};
