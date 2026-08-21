import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ColorBg } from "../components/ColorBg";
import { SceneImage } from "../components/SceneImage";
import { MaskSlideText } from "../components/MaskSlideText";
import { Sfx } from "../components/Sfx";
import { EASE_IN_OUT, EASE_OUT_EXPO, fontFamily } from "../tokens";

const WIPE_FRAME = 120;

const TOOLS = [
  { label: "SCRIPTS PRÊTS À L'EMPLOI", icon: "📋", at: 10, top: 640 },
  { label: "MÉMO OBJECTIONS", icon: "🧠", at: 70, top: 900 },
  { label: "COACHING PERSONNALISÉ", icon: "🎯", at: 130, top: 1160 },
];

const Card: React.FC<{ label: string; icon: string; at: number; top: number }> = ({
  label,
  icon,
  at,
  top,
}) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [at, at + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT_EXPO,
  });
  const translateX = interpolate(enter, [0, 1], [500, 0]);

  const reduced = interpolate(frame, [WIPE_FRAME, WIPE_FRAME + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_IN_OUT,
  });
  const scale = interpolate(reduced, [0, 1], [1, 0.92]);
  const opacity = interpolate(reduced, [0, 1], [1, 0.6]) * enter;
  const reducedTop = interpolate(reduced, [0, 1], [top, 60 + (top - 640) * 0.18]);

  return (
    <div
      style={{
        position: "absolute",
        top: reducedTop,
        left: 110,
        translate: `${translateX}px 0`,
        scale: `${scale}`,
        opacity,
        transformOrigin: "left top",
      }}
    >
      <div
        style={{
          width: 860,
          height: 220,
          backgroundColor: "#FFFFFF",
          border: "2px solid #0E7A5F",
          borderRadius: 18,
          display: "flex",
          alignItems: "center",
          gap: 30,
          padding: "0 40px",
          boxShadow: "0 16px 30px rgba(0,0,0,0.12)",
        }}
      >
        <div style={{ fontSize: 64 }}>{icon}</div>
        <div style={{ fontFamily, fontWeight: 900, fontSize: 40, color: "#1A1A1A", lineHeight: 1.1 }}>
          {label}
        </div>
      </div>
    </div>
  );
};

export const Bloc7Outils: React.FC = () => {
  const frame = useCurrentFrame();

  const wipe = interpolate(frame, [WIPE_FRAME, WIPE_FRAME + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_IN_OUT,
  });

  return (
    <AbsoluteFill>
      <ColorBg univers="clair" />

      {TOOLS.map((t) => (
        <Card key={t.label} {...t} />
      ))}

      {frame >= WIPE_FRAME - 5 ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: `inset(${100 * (1 - wipe)}% 0 0 0)`,
          }}
        >
          <SceneImage
            src={staticFile("assets/images/g06_coach_ecoute.jpg")}
            spanFrames={240}
            voile="bottom"
          />
        </div>
      ) : null}

      <div style={{ position: "absolute", top: 1600, left: 72, right: 72 }}>
        <MaskSlideText appearFrame={180} fontSize={78} color="#FFFFFF">
          TU N&apos;ES JAMAIS LÂCHÉE DANS LA NATURE.
        </MaskSlideText>
      </div>

      <Sfx type="whoosh" at={0} />
    </AbsoluteFill>
  );
};
