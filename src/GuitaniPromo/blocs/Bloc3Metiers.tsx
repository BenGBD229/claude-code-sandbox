import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ColorBg } from "../components/ColorBg";
import { MaskSlideText } from "../components/MaskSlideText";
import { Sfx } from "../components/Sfx";
import { EASE_IN_OUT, fontFamily, LINEAR } from "../tokens";

const IconHeadset: React.FC<{ color: string }> = ({ color }) => (
  <svg width={56} height={56} viewBox="0 0 24 24" fill="none">
    <path
      d="M4 13v-1a8 8 0 0 1 16 0v1"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <rect x={3} y={13} width={4} height={6} rx={2} fill={color} />
    <rect x={17} y={13} width={4} height={6} rx={2} fill={color} />
    <path
      d="M19 19v1a2 2 0 0 1-2 2h-3"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);

const IconPhone: React.FC<{ color: string }> = ({ color }) => (
  <svg width={56} height={56} viewBox="0 0 24 24" fill="none">
    <path
      d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5a2 2 0 0 1 2-2Z"
      stroke={color}
      strokeWidth={2}
      strokeLinejoin="round"
    />
  </svg>
);

const IconCalendar: React.FC<{ color: string }> = ({ color }) => (
  <svg width={56} height={56} viewBox="0 0 24 24" fill="none">
    <rect x={3} y={5} width={18} height={16} rx={2} stroke={color} strokeWidth={2} />
    <path d="M3 9.5h18" stroke={color} strokeWidth={2} />
    <path d="M8 3v3.5M16 3v3.5" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <path d="M8 14l2.2 2.2L15 12" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconHandshake: React.FC<{ color: string }> = ({ color }) => (
  <svg width={56} height={56} viewBox="0 0 24 24" fill="none">
    <path
      d="M2 10.5 6 7l4 2.5-2.3 2.3a1.4 1.4 0 0 0 2 2L13 10l3.3 3.3a1.4 1.4 0 0 0 2-2L15 8l3-2 4 3.5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M6 7 2 10.5v4L6 18M18 6l4 3.5v4L18 18" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const STATIONS = [
  { label: "CONSEILLER CLIENT", Icon: IconHeadset, x: 150, at: 120, big: false },
  { label: "TÉLÉVENDEUR", Icon: IconPhone, x: 780, at: 150, big: false },
  { label: "SETTER", Icon: IconCalendar, x: 1410, at: 180, big: false },
  { label: "CLOSER HIGH TICKET", Icon: IconHandshake, x: 2060, at: 210, big: true },
];

const CANVAS_WIDTH = 2500;
const VIEWPORT = 1080;
const LINE_Y = 960;

const Station: React.FC<{
  x: number;
  label: string;
  Icon: React.FC<{ color: string }>;
  at: number;
  big: boolean;
}> = ({ x, label, Icon, at, big }) => {
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
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <Icon color={lit ? "#FFFFFF" : "#101318"} />
        </div>
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
  const panProgress = interpolate(frame, [55, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_IN_OUT,
  });
  const camX = interpolate(panProgress, [0, 1], [0, CANVAS_WIDTH - VIEWPORT]);

  const lineDraw = interpolate(frame, [55, 235], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: LINEAR,
  });

  return (
    <AbsoluteFill>
      <ColorBg univers="sombre" />

      {/* Voice: "Et pas un seul métier : 4." = 600-660 (local 60-120) */}
      <div style={{ position: "absolute", top: 545 - 540, left: 72, right: 72 }}>
        <MaskSlideText appearFrame={60} fontSize={96} color="#FFFFFF">
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

      <Sfx type="whoosh" at={0} />
      {STATIONS.map((s) => (
        <Sfx key={s.label} type="tick" at={s.at} volume={0.5} />
      ))}
    </AbsoluteFill>
  );
};
