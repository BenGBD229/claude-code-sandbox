import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ColorBg } from "../components/ColorBg";
import { MaskSlideText } from "../components/MaskSlideText";
import { Sfx } from "../components/Sfx";
import { EASE_IN_OUT, fontFamily, LINEAR } from "../tokens";

const STATIONS = [
  { label: "CONSEILLER CLIENT", icon: "🎧", x: 150, at: 30, big: false },
  { label: "TÉLÉVENDEUR", icon: "📞", x: 780, at: 80, big: false },
  { label: "SETTER", icon: "🗓", x: 1410, at: 130, big: false },
  { label: "CLOSER HIGH TICKET", icon: "🤝", x: 2060, at: 180, big: true },
];

const CANVAS_WIDTH = 2500;
const VIEWPORT = 1080;
const LINE_Y = 960;

const Station: React.FC<{
  x: number;
  label: string;
  icon: string;
  at: number;
  big: boolean;
}> = ({ x, label, icon, at, big }) => {
  const frame = useCurrentFrame();
  const lit = frame >= at;
  const w = big ? 340 : 300;
  const enter = interpolate(frame, [at - 10, at], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x - w / 2,
        top: LINE_Y - 190,
        width: w,
        opacity: enter,
        translate: `0 ${(1 - enter) * 24}px`,
      }}
    >
      <div
        style={{
          borderRadius: 20,
          padding: "34px 20px",
          textAlign: "center",
          backgroundColor: lit ? "#0E7A5F" : "#FFFFFF",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 12 }}>{icon}</div>
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: big ? 30 : 26,
            color: lit ? "#FFFFFF" : "#101318",
            textTransform: "uppercase",
            lineHeight: 1.15,
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

export const Bloc3Metiers: React.FC = () => {
  const frame = useCurrentFrame();

  // Camera pan follows the arrow tip across the canvas.
  const panProgress = interpolate(frame, [25, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_IN_OUT,
  });
  const camX = interpolate(panProgress, [0, 1], [0, CANVAS_WIDTH - VIEWPORT]);

  const lineDraw = interpolate(frame, [25, 220], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: LINEAR,
  });

  return (
    <AbsoluteFill>
      <ColorBg univers="sombre" />

      <div style={{ position: "absolute", top: 545 - 540, left: 72, right: 72 }}>
        <MaskSlideText appearFrame={5} fontSize={96} color="#FFFFFF">
          PAS UN MÉTIER. QUATRE.
        </MaskSlideText>
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: CANVAS_WIDTH,
          height: 1920,
          translate: `${-camX}px 0`,
        }}
      >
        <svg
          width={CANVAS_WIDTH}
          height={1920}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <line
            x1={0}
            y1={LINE_Y}
            x2={CANVAS_WIDTH}
            y2={LINE_Y}
            stroke="#C5A059"
            strokeWidth={6}
            strokeDasharray={CANVAS_WIDTH}
            strokeDashoffset={CANVAS_WIDTH * (1 - lineDraw)}
          />
        </svg>
        {STATIONS.map((s) => (
          <Station key={s.label} {...s} />
        ))}
      </div>

      <div style={{ position: "absolute", top: 730 - 540, left: 72, right: 72 }}>
        <MaskSlideText appearFrame={190} fontSize={84} color="#FFFFFF">
          TU ENTRES. TU MONTES.
        </MaskSlideText>
      </div>

      <Sfx type="whoosh" at={0} />
      {STATIONS.map((s) => (
        <Sfx key={s.label} type="tick" at={s.at} volume={0.5} />
      ))}
    </AbsoluteFill>
  );
};
