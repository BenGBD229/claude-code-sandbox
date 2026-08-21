import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ColorBg } from "../components/ColorBg";
import { SceneImage } from "../components/SceneImage";
import { MaskSlideText } from "../components/MaskSlideText";
import { Cartouche } from "../components/Cartouche";
import { FloatingPhone } from "../components/FloatingPhone";
import { Sfx } from "../components/Sfx";
import { DUR, EASE_OUT_EXPO } from "../tokens";

// Voice says "en France, en Suisse, au Canada" (90-180f) — Belgique isn't
// named until bloc 6, so it doesn't belong in this chip cycle.
const CHIPS = ["FRANCE", "SUISSE", "CANADA"];
// Onset of each country name within the 90-180f voice window.
const CHIP_TIMES = [90, 120, 150];

const PhoneScreenBg: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = (frame % 90) / 90;
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A1420" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 46%, rgba(197,160,89,0.35) 0%, transparent 60%)",
        }}
      />
      {[0, 1, 2].map((i) => {
        const p = (pulse + i / 3) % 1;
        const scale = 0.3 + p * 1.1;
        const opacity = (1 - p) * 0.35;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "46%",
              left: "50%",
              width: 160,
              height: 160,
              borderRadius: "50%",
              border: "2px solid #C5A059",
              translate: "-50% -50%",
              scale: `${scale}`,
              opacity,
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          top: "46%",
          left: "50%",
          width: 14,
          height: 14,
          borderRadius: "50%",
          backgroundColor: "#C5A059",
          translate: "-50% -50%",
        }}
      />
    </AbsoluteFill>
  );
};

const CountryChips: React.FC = () => {
  const frame = useCurrentFrame();
  const chipStart = CHIP_TIMES[0];
  let activeIndex = -1;
  for (let i = CHIP_TIMES.length - 1; i >= 0; i--) {
    if (frame >= CHIP_TIMES[i]) {
      activeIndex = i;
      break;
    }
  }
  if (activeIndex < 0) return null;
  const localInChip = frame - CHIP_TIMES[activeIndex];
  const scale = interpolate(localInChip, [0, DUR.instant], [0.7, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT_EXPO,
  });

  if (frame < chipStart) return null;

  return (
    <AbsoluteFill
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.55)",
          color: "#fff",
          fontFamily: "inherit",
          fontWeight: 900,
          fontSize: 34,
          padding: "10px 22px",
          borderRadius: 10,
          scale: `${scale}`,
          letterSpacing: 1,
        }}
      >
        {CHIPS[activeIndex]}
      </div>
    </AbsoluteFill>
  );
};

export const Bloc1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const isAccent = frame >= 190;

  const medalScale = interpolate(frame, [190, 190 + DUR.base], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT_EXPO,
  });

  const handOpacity = interpolate(frame, [60, 60 + DUR.base], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT_EXPO,
  });

  return (
    <AbsoluteFill>
      {!isAccent ? (
        <>
          <SceneImage
            src={staticFile("assets/images/g01_femme_casque_hero.jpg")}
            spanFrames={270}
            voile="bottom"
          />
          <div style={{ position: "absolute", top: 600, left: 72, right: 72 }}>
            <MaskSlideText appearFrame={32} fontSize={100} color="#FFFFFF">
              TRAVAILLER
              <br />
              DEPUIS CHEZ TOI
            </MaskSlideText>
            <div style={{ height: 24 }} />
            <MaskSlideText appearFrame={92} fontSize={66} color="#FFFFFF">
              POUR DES ENTREPRISES
              <br />À L&apos;INTERNATIONAL
            </MaskSlideText>
          </div>

          {frame >= 60 ? (
            <>
              <div style={{ position: "absolute", bottom: -60, right: -40 }}>
                <FloatingPhone width={480} enterFrame={60}>
                  <PhoneScreenBg />
                  <CountryChips />
                </FloatingPhone>
              </div>
              {/* g13 is a hand holding a phone with an empty screen: crop to
                  just the thumb/grip area (source y 479-1100 of 1376) and lay
                  it in front so it reads as if it is holding the coded
                  <FloatingPhone /> chassis above. */}
              <div
                style={{
                  position: "absolute",
                  bottom: -40,
                  right: -20,
                  width: 420,
                  height: 340,
                  overflow: "hidden",
                  opacity: handOpacity,
                  translate: `0 ${(1 - handOpacity) * 60}px`,
                }}
              >
                <Img
                  src={staticFile("assets/images/g13_main_telephone.jpg")}
                  style={{
                    position: "absolute",
                    top: -262,
                    left: 0,
                    width: 420,
                    height: "auto",
                  }}
                />
              </div>
            </>
          ) : null}
        </>
      ) : (
        <>
          <ColorBg univers="accent" />
          <div
            style={{
              position: "absolute",
              top: 700,
              right: -60,
              width: 420,
              height: 420,
              borderRadius: "50%",
              overflow: "hidden",
              scale: `${medalScale}`,
              border: "8px solid #14161A",
            }}
          >
            <Img
              src={staticFile("assets/images/g02_femme_casque_sourire.jpg")}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ position: "absolute", top: 780, left: 72, width: 620 }}>
            <MaskSlideText appearFrame={190 + 4} fontSize={96} color="#1A1A1A">
              SANS JAMAIS QUITTER{" "}
              <Cartouche univers="accent" appearFrame={190 + 18} fontSize={96}>
                TA VILLE
              </Cartouche>
              .
            </MaskSlideText>
          </div>
        </>
      )}

      <Sfx type="whoosh" at={190} />
    </AbsoluteFill>
  );
};
