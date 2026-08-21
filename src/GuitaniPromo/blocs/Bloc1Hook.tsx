import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ColorBg } from "../components/ColorBg";
import { SceneImage } from "../components/SceneImage";
import { MaskSlideText } from "../components/MaskSlideText";
import { Cartouche } from "../components/Cartouche";
import { FloatingPhone } from "../components/FloatingPhone";
import { Sfx } from "../components/Sfx";
import { DUR, EASE_OUT_EXPO } from "../tokens";

const CHIPS = ["FRANCE", "SUISSE", "BELGIQUE", "CANADA"];

const CountryChips: React.FC = () => {
  const frame = useCurrentFrame();
  // one chip every 30 local frames, starting at 70 (relative to bloc start)
  const chipStart = 70;
  const chipEvery = 30;
  const activeIndex = Math.min(
    CHIPS.length - 1,
    Math.max(0, Math.floor((frame - chipStart) / chipEvery)),
  );
  const localInChip = (frame - chipStart) % chipEvery;
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
            <MaskSlideText appearFrame={40} fontSize={100} color="#FFFFFF">
              TRAVAILLER
              <br />
              DEPUIS CHEZ TOI
            </MaskSlideText>
            <div style={{ height: 24 }} />
            <MaskSlideText appearFrame={110} fontSize={66} color="#FFFFFF">
              POUR DES ENTREPRISES
              <br />À L&apos;INTERNATIONAL
            </MaskSlideText>
          </div>

          {frame >= 60 ? (
            <>
              <div style={{ position: "absolute", bottom: -60, right: -40 }}>
                <FloatingPhone width={480} enterFrame={60}>
                  <AbsoluteFill style={{ backgroundColor: "#050607" }} />
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
