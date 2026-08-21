import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ColorBg } from "../components/ColorBg";
import { MaskSlideText } from "../components/MaskSlideText";
import { Cartouche } from "../components/Cartouche";
import { FloatingPhone } from "../components/FloatingPhone";
import { Sfx } from "../components/Sfx";
import { DUR, EASE_IN_OUT, fontFamily } from "../tokens";

const MESSAGE = "Bonjour, je veux en savoir plus";
const TYPE_START = 190;
const CHARS_PER_FRAME = 2;
const TYPE_END = TYPE_START + Math.ceil(MESSAGE.length / CHARS_PER_FRAME);
const SEND_FRAME = TYPE_END + 10;

const MessagingScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = Math.max(
    0,
    Math.min(MESSAGE.length, Math.floor((frame - TYPE_START) * CHARS_PER_FRAME)),
  );
  const cursorOn = Math.floor(frame / 8) % 2 === 0;

  const sendProgress = interpolate(frame, [SEND_FRAME, SEND_FRAME + DUR.base], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_IN_OUT,
  });

  if (frame < TYPE_START) {
    return <div style={{ width: "100%", height: "100%", backgroundColor: "#171B21" }} />;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#171B21",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: 24,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          alignSelf: "flex-end",
          maxWidth: "80%",
          backgroundColor: "#C5A059",
          color: "#1A1A1A",
          borderRadius: 16,
          padding: "14px 20px",
          fontFamily,
          fontWeight: 800,
          fontSize: 24,
          opacity: frame < SEND_FRAME ? 1 : 1 - sendProgress,
          translate: `0 ${sendProgress * -80}px`,
        }}
      >
        {MESSAGE.slice(0, typed)}
        {frame < TYPE_END && cursorOn ? "|" : ""}
      </div>
      {frame >= SEND_FRAME + 4 ? (
        <div
          style={{
            alignSelf: "flex-end",
            marginTop: 10,
            backgroundColor: "#0E7A5F",
            color: "#fff",
            borderRadius: 16,
            padding: "14px 20px",
            fontFamily,
            fontWeight: 800,
            fontSize: 24,
            opacity: interpolate(frame, [SEND_FRAME + 4, SEND_FRAME + 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {MESSAGE}
        </div>
      ) : null}
    </div>
  );
};

export const Bloc9Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const phase = frame < 110 ? "punch1" : frame < 180 ? "punch2" : "carton";

  const badgePulse = 1 + Math.sin((Math.max(0, frame - 110) / 40) * Math.PI * 2) * 0.02;

  return (
    <AbsoluteFill>
      {phase !== "carton" ? (
        <>
          <ColorBg univers="accent" />
          {phase === "punch1" ? (
            <div style={{ position: "absolute", top: 850, left: 72, right: 72 }}>
              <MaskSlideText appearFrame={4} fontSize={38} color="#1A1A1A">
                <Cartouche univers="accent" appearFrame={10} fontSize={38}>
                  LE PREMIER PAS, C&apos;EST PAS UN PAIEMENT.
                </Cartouche>
              </MaskSlideText>
            </div>
          ) : (
            <>
              <div style={{ position: "absolute", top: 700, left: 72, right: 72 }}>
                <MaskSlideText appearFrame={0} fontSize={70} color="#1A1A1A">
                  ON VOIT ENSEMBLE SI LE MÉTIER
                  <br />
                  EST FAIT POUR TOI.
                </MaskSlideText>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 1000,
                  left: 72,
                  scale: `${badgePulse}`,
                }}
              >
                <Cartouche univers="accent" appearFrame={5} fontSize={60}>
                  20 PLACES
                </Cartouche>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <ColorBg univers="sombre" />
          <div style={{ position: "absolute", top: 640, left: 72, width: 560 }}>
            <MaskSlideText appearFrame={4} fontSize={84} color="#FFFFFF">
              👉 CLIQUE SUR
              <br />
              LE LIEN
            </MaskSlideText>
            <div style={{ height: 24 }} />
            <MaskSlideText appearFrame={20} fontSize={30} color="#FFFFFF">
              <Cartouche univers="sombre" appearFrame={20} fontSize={30}>
                POUR NOUS CONTACTER — SANS ENGAGEMENT
              </Cartouche>
            </MaskSlideText>
          </div>

          <div style={{ position: "absolute", bottom: 260, right: -20 }}>
            <FloatingPhone width={420} enterFrame={10}>
              <MessagingScreen />
            </FloatingPhone>
          </div>

          <div style={{ position: "absolute", bottom: 90, left: 72 }}>
            <Img
              src={staticFile("assets/client/g11_logo_guitani_claire.png")}
              style={{ height: 70, objectFit: "contain" }}
            />
          </div>

          <Sfx type="clavier" at={TYPE_START} volume={0.5} durationInFrames={TYPE_END - TYPE_START} />
          <Sfx type="pop" at={SEND_FRAME} />
          <Sfx type="whoosh" at={180} />
        </>
      )}

      <Sfx type="whoosh" at={0} />
    </AbsoluteFill>
  );
};
