import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ColorBg } from "../components/ColorBg";
import { MaskSlideText } from "../components/MaskSlideText";
import { FloatingPhone } from "../components/FloatingPhone";
import { Sfx } from "../components/Sfx";
import { DUR, EASE_OUT_EXPO, fontFamily } from "../tokens";

const ADS = [
  "assets/ads/g14_annonce_01.jpeg",
  "assets/ads/g14_annonce_02.jpeg",
  "assets/ads/g14_annonce_03.jpeg",
];

const ARRIVALS = [2, 38, 74, 110, 146, 182];
const ITEM_HEIGHT = 300;
const LANDING_Y = 640;
const SPRING_FRAMES = DUR.base;

const FeedItem: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const at = ARRIVALS[index];
  if (frame < at) return null;

  const ownProgress = interpolate(frame, [at, at + SPRING_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT_EXPO,
  });

  let shift = 0;
  for (let m = index + 1; m < ARRIVALS.length; m++) {
    shift +=
      interpolate(frame, [ARRIVALS[m], ARRIVALS[m] + SPRING_FRAMES], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: EASE_OUT_EXPO,
      }) * ITEM_HEIGHT;
  }

  const y = LANDING_Y - shift + (1 - ownProgress) * 120;

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: 24,
        right: 24,
        opacity: ownProgress,
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Img
          src={staticFile(ADS[index % ADS.length])}
          style={{ width: "100%", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "#0E7A5F",
            color: "#fff",
            fontFamily,
            fontWeight: 900,
            fontSize: 16,
            padding: "4px 10px",
            borderRadius: 6,
          }}
        >
          NOUVEAU
        </div>
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "rgba(0,0,0,0.55)",
            color: "#fff",
            fontFamily,
            fontWeight: 900,
            fontSize: 14,
            padding: "4px 10px",
            borderRadius: 6,
          }}
        >
          À L&apos;INSTANT
        </div>
      </div>
    </div>
  );
};

const CountryChip: React.FC<{
  label: string;
  at: number;
  top: number;
  left?: number;
  right?: number;
}> = ({ label, at, top, left, right }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [at, at + DUR.instant], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT_EXPO,
  });
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        right,
        scale: `${scale}`,
        backgroundColor: "#C5A059",
        color: "#1A1A1A",
        fontFamily,
        fontWeight: 900,
        fontSize: 26,
        padding: "8px 18px",
        borderRadius: 10,
      }}
    >
      {label}
    </div>
  );
};

export const Bloc6Reseau: React.FC = () => {
  return (
    <AbsoluteFill>
      <ColorBg univers="sombre" />

      <div style={{ position: "absolute", top: 20, left: 72, right: 72 }}>
        <MaskSlideText appearFrame={20} fontSize={90} color="#FFFFFF">
          ACCÈS À VIE AU GROUPE PRIVÉ.
        </MaskSlideText>
      </div>
      <div style={{ position: "absolute", top: 1720, left: 72, right: 72 }}>
        <MaskSlideText appearFrame={120} fontSize={82} color="#FFFFFF">
          DES OFFRES, TOUS LES JOURS.
        </MaskSlideText>
      </div>

      {/* Voice: "...en France, en Belgique, au Canada et en Afrique." =
          roughly 1290-1380 (local 90-180). */}
      <CountryChip label="FR" at={90} top={330} left={40} />
      <CountryChip label="BE" at={120} top={330} right={40} />
      <CountryChip label="CA" at={145} top={1560} left={40} />
      <CountryChip label="AFRIQUE" at={165} top={1560} right={40} />

      <div
        style={{
          position: "absolute",
          top: 480,
          left: "50%",
          translate: "-50% 0",
        }}
      >
        <FloatingPhone width={810}>
          <div style={{ width: "100%", height: "100%", backgroundColor: "#171B21", position: "relative", overflow: "hidden" }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 90,
                backgroundColor: "#0E1216",
                display: "flex",
                alignItems: "center",
                paddingLeft: 28,
                gap: 14,
                zIndex: 1,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#C5A059",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily,
                  fontWeight: 900,
                  color: "#1A1A1A",
                  fontSize: 20,
                }}
              >
                G
              </div>
              <span style={{ fontFamily, fontWeight: 900, fontSize: 24, color: "#fff" }}>
                GROUPE PRIVÉ
              </span>
            </div>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <FeedItem key={i} index={i} />
            ))}
          </div>
        </FloatingPhone>
      </div>

      <Sfx type="whoosh" at={0} />
      {ARRIVALS.map((a, i) => (
        <Sfx key={i} type="pop" at={a} volume={0.5} />
      ))}
    </AbsoluteFill>
  );
};
