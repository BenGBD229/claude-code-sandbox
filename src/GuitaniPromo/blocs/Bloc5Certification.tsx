import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ColorBg } from "../components/ColorBg";
import { MaskSlideText } from "../components/MaskSlideText";
import { Sfx } from "../components/Sfx";
import { DUR, EASE_IN_OUT, EASE_OUT_EXPO, fontFamily } from "../tokens";

const LAND_FRAME = 150;

export const Bloc5Certification: React.FC = () => {
  const frame = useCurrentFrame();

  const draw = interpolate(frame, [0, DUR.slow], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT_EXPO,
  });

  const landProgress = interpolate(frame, [LAND_FRAME - 20, LAND_FRAME], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_IN_OUT,
  });

  const scale = interpolate(landProgress, [0, 1], [1, 0.46]);
  const posY = interpolate(landProgress, [0, 1], [560, 1160]);
  const rotate = interpolate(landProgress, [0, 1], [0, -4]);

  const sinceLand = frame - LAND_FRAME;
  const shake =
    sinceLand >= 0 && sinceLand < DUR.instant
      ? Math.sin(sinceLand * 8) * (1 - sinceLand / DUR.instant) * 3
      : 0;

  return (
    <AbsoluteFill>
      <ColorBg univers="clair" />

      <div style={{ position: "absolute", top: 20, left: 72, right: 72 }}>
        {/* Voice: "Tu ressors avec une certification professionnelle," =
            1020-1080 (local 30-90). */}
        <MaskSlideText appearFrame={30} fontSize={96} color="#1A1A1A">
          TU RESSORS CERTIFIÉ(E).
        </MaskSlideText>
      </div>

      {frame >= LAND_FRAME - 10 ? (
        <Img
          src={staticFile("assets/images/g05_cv_table.jpg")}
          style={{
            position: "absolute",
            top: 700,
            left: 72,
            width: 936,
            height: 1000,
            objectFit: "cover",
            borderRadius: 12,
            opacity: interpolate(frame, [LAND_FRAME - 10, LAND_FRAME], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      ) : null}

      <div
        style={{
          position: "absolute",
          top: posY,
          left: 540,
          translate: `-50% -50%`,
          rotate: `${rotate + shake}deg`,
          scale: `${scale}`,
          width: 760,
          boxShadow: `0 ${interpolate(landProgress, [0, 1], [60, 14])}px ${interpolate(
            landProgress,
            [0, 1],
            [90, 20],
          )}px rgba(0,0,0,0.35)`,
        }}
      >
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "3px solid #0E7A5F",
            borderRadius: 8,
            padding: 40,
            clipPath: `inset(0 ${100 * (1 - draw)}% ${100 * (1 - draw)}% 0)`,
          }}
        >
          <div
            style={{
              border: "1px solid #0E7A5F",
              padding: 32,
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily, fontWeight: 900, fontSize: 30, color: "#0E7A5F" }}>
              CERTIFICATION PROFESSIONNELLE
            </div>
            <div style={{ height: 24 }} />
            <div style={{ fontFamily, fontWeight: 900, fontSize: 48, color: "#1A1A1A" }}>
              TÉLÉOPÉRATEUR PRO
            </div>
            <div style={{ height: 12 }} />
            <div style={{ fontFamily, fontWeight: 900, fontSize: 26, color: "#8A8F98" }}>
              GUITANI CORPORATE
            </div>
            <div style={{ height: 32 }} />
            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                border: "4px solid #C5A059",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily,
                fontWeight: 900,
                color: "#C5A059",
                fontSize: 34,
              }}
            >
              G
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", top: 1750, left: 72, right: 72 }}>
        {/* Voice: "la preuve concrète que tu sais faire, à mettre sur ton
            CV." = 1080-1140 (local 90-150) — visible during the landing. */}
        <MaskSlideText appearFrame={90} fontSize={78} color="#1A1A1A">
          LA PREUVE CONCRÈTE, SUR TON CV.
        </MaskSlideText>
      </div>

      <Sfx type="whoosh" at={0} />
      <Sfx type="impact" at={LAND_FRAME} />
    </AbsoluteFill>
  );
};
