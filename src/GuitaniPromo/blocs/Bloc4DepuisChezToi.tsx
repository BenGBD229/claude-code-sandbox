import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ColorBg } from "../components/ColorBg";
import { SceneImage } from "../components/SceneImage";
import { MaskSlideText } from "../components/MaskSlideText";
import { Cartouche } from "../components/Cartouche";
import { FloatingPhone } from "../components/FloatingPhone";
import { Sfx } from "../components/Sfx";
import { DUR, EASE_IN_SHARP, fontFamily } from "../tokens";

const Cross: React.FC<{ appearFrame: number }> = ({ appearFrame }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [appearFrame, appearFrame + DUR.fast], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_IN_SHARP,
  });
  return (
    <svg width={40} height={40} style={{ display: "inline-block", verticalAlign: "middle" }}>
      <line
        x1={4}
        y1={4}
        x2={36}
        y2={36}
        stroke="#1A1A1A"
        strokeWidth={6}
        strokeDasharray={45}
        strokeDashoffset={45 * (1 - progress)}
      />
      <line
        x1={36}
        y1={4}
        x2={4}
        y2={36}
        stroke="#1A1A1A"
        strokeWidth={6}
        strokeDasharray={45}
        strokeDashoffset={45 * (1 - progress)}
      />
    </svg>
  );
};

export const Bloc4DepuisChezToi: React.FC = () => {
  const frame = useCurrentFrame();
  const isAccent = frame >= 120;

  return (
    <AbsoluteFill>
      {!isAccent ? (
        <>
          <SceneImage
            src={staticFile("assets/images/g03_setup_maison.jpg")}
            spanFrames={210}
            voile="full"
            voileOpacity={0.35}
          />
          <div style={{ position: "absolute", top: 700, left: 72, right: 72 }}>
            <MaskSlideText appearFrame={10} fontSize={80} color="#FFFFFF">
              DEPUIS CHEZ TOI.
            </MaskSlideText>
            <div style={{ height: 16 }} />
            <MaskSlideText appearFrame={26} fontSize={80} color="#FFFFFF">
              À TON RYTHME.
            </MaskSlideText>
            <div style={{ height: 16 }} />
            <MaskSlideText appearFrame={42} fontSize={80} color="#FFFFFF">
              EN VISIO.
            </MaskSlideText>
          </div>
        </>
      ) : (
        <>
          <ColorBg univers="accent" />
          <div style={{ position: "absolute", top: 640, left: 72, right: 72 }}>
            <div
              style={{
                fontFamily,
                fontWeight: 900,
                fontSize: 76,
                color: "#1A1A1A",
                display: "flex",
                alignItems: "center",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              <Cross appearFrame={0} /> DÉPLACEMENTS
              <Cross appearFrame={12} /> TRANSPORT
            </div>
            <div style={{ height: 30 }} />
            <MaskSlideText appearFrame={26} fontSize={46} color="#1A1A1A">
              <Cartouche univers="accent" appearFrame={26} fontSize={46}>
                TA VOIX + UNE MÉTHODE.
              </Cartouche>
            </MaskSlideText>
          </div>
          <div style={{ position: "absolute", bottom: -80, right: -40 }}>
            <FloatingPhone width={440} enterFrame={20}>
              <Img
                src={staticFile("assets/images/g04_femme_visio_cours.jpg")}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </FloatingPhone>
          </div>
        </>
      )}

      <Sfx type="whoosh" at={0} />
      <Sfx type="whoosh" at={120} />
    </AbsoluteFill>
  );
};
