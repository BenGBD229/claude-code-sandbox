import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ColorBg } from "../components/ColorBg";
import { MaskSlideText } from "../components/MaskSlideText";
import { Cartouche } from "../components/Cartouche";
import { FloatingPhone } from "../components/FloatingPhone";
import { Sfx } from "../components/Sfx";
import { DUR, EASE_IN_SHARP, EASE_OUT_EXPO, fontFamily } from "../tokens";

export const Bloc2Annonce: React.FC = () => {
  const frame = useCurrentFrame();

  const shimmerX = interpolate(frame, [20, 90], [-30, 130], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT_EXPO,
  });

  const logoOpacity = interpolate(frame, [90, 90 + DUR.base], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const barTrace = interpolate(frame, [170, 170 + DUR.fast], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_IN_SHARP,
  });
  const robotOpacity = interpolate(frame, [178, 210], [1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <ColorBg univers="clair" />

      {frame < 20 ? (
        <div style={{ position: "absolute", bottom: -420, right: -60 }}>
          <FloatingPhone width={480}>
            <div style={{ width: "100%", height: "100%", backgroundColor: "#0B0D10" }} />
          </FloatingPhone>
        </div>
      ) : null}

      <div style={{ position: "absolute", top: 560, left: 72, right: 72 }}>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <MaskSlideText appearFrame={20} fontSize={92} color="#1A1A1A" duration={DUR.slow}>
            TÉLÉOPÉRATEUR
            <br />
            PRO
          </MaskSlideText>
          {frame >= 20 && frame <= 95 ? (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: `${shimmerX}%`,
                width: "35%",
                height: "100%",
                background:
                  "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)",
                mixBlendMode: "overlay",
              }}
            />
          ) : null}
        </div>

        <div style={{ marginTop: 28, opacity: logoOpacity }}>
          <Img
            src={staticFile("assets/client/g11_logo_guitani_sombre.png")}
            style={{ height: 90, objectFit: "contain" }}
          />
        </div>
      </div>

      <div style={{ position: "absolute", top: 1080, left: 72, right: 72 }}>
        <MaskSlideText appearFrame={160} fontSize={96} color="#1A1A1A">
          <Cartouche univers="clair" appearFrame={160} fontSize={96}>
            2 MOIS.
          </Cartouche>
        </MaskSlideText>
        <div style={{ height: 20 }} />
        <MaskSlideText appearFrame={180} fontSize={84} color="#1A1A1A">
          UNE VRAIE COMPÉTENCE.
        </MaskSlideText>
        <div style={{ height: 14 }} />
        <MaskSlideText appearFrame={200} fontSize={78} color="#1A1A1A">
          LA RELATION HUMAINE
          <br />
          AU TÉLÉPHONE.
        </MaskSlideText>
      </div>

      {frame >= 170 ? (
        <div
          style={{
            position: "absolute",
            top: 1560,
            left: 72,
            right: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: "#0E7A5F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily,
                color: "#fff",
                fontWeight: 900,
                fontSize: 30,
              }}
            >
              ))
            </div>
            <span style={{ fontFamily, fontWeight: 900, fontSize: 30, color: "#0E7A5F" }}>
              VOIX HUMAINE
            </span>
          </div>
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 16, opacity: robotOpacity }}>
            <span style={{ fontFamily, fontWeight: 900, fontSize: 30, color: "#8A8F98" }}>
              ROBOT
            </span>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 14,
                backgroundColor: "#C9CDD3",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "8%",
                  width: `${barTrace * 84}%`,
                  height: 6,
                  backgroundColor: "#C5A059",
                  transform: "translateY(-50%) rotate(-30deg)",
                }}
              />
            </div>
          </div>
        </div>
      ) : null}

      <Sfx type="whoosh" at={0} />
      <Sfx type="pop" at={160} />
    </AbsoluteFill>
  );
};
