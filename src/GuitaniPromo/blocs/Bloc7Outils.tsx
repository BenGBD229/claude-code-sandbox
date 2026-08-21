import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ColorBg } from "../components/ColorBg";
import { SceneImage } from "../components/SceneImage";
import { MaskSlideText } from "../components/MaskSlideText";
import { Sfx } from "../components/Sfx";
import { EASE_IN_OUT, EASE_OUT_EXPO, fontFamily } from "../tokens";

const WIPE_FRAME = 120;

// Voice: "avec des scripts prêts à l'emploi" is said just before this bloc
// starts, "un mémo objections" = 1440-1500 (local 0-60), "et un coaching qui
// t'accompagne jusqu'à ton premier contrat" = 1500-1560 (local 60-120).
const TOOLS = [
  { label: "SCRIPTS PRÊTS À L'EMPLOI", icon: "📋", at: 0, top: 640 },
  { label: "MÉMO OBJECTIONS", icon: "🧠", at: 20, top: 900 },
  { label: "COACHING PERSONNALISÉ", icon: "🎯", at: 65, top: 1160 },
];

const Card: React.FC<{ label: string; icon: string; at: number; top: number; index: number }> = ({
  label,
  icon,
  at,
  top,
  index,
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
  const scale = interpolate(reduced, [0, 1], [1, 0.32]);
  const opacity = interpolate(reduced, [0, 1], [1, 0.7]) * enter;
  // Reduced cards stack in a tight, non-overlapping band at the top.
  const reducedTop = interpolate(reduced, [0, 1], [top, 40 + index * 78]);

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

      {/* Cards render after (on top of) the wiped-in video so they stay
          visible in surimpression once the wipe completes. */}
      {TOOLS.map((t, i) => (
        <Card key={t.label} {...t} index={i} />
      ))}

      <div style={{ position: "absolute", top: 1600, left: 72, right: 72 }}>
        {/* Voice: "Tu n'es jamais lâché dans la nature." = 1560-1620
            (local 120-180). */}
        <MaskSlideText appearFrame={125} fontSize={78} color="#FFFFFF">
          TU N&apos;ES JAMAIS LÂCHÉE DANS LA NATURE.
        </MaskSlideText>
      </div>

      <Sfx type="whoosh" at={0} />
    </AbsoluteFill>
  );
};
