import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SceneImage } from "../components/SceneImage";
import { MaskSlideText } from "../components/MaskSlideText";
import { Cartouche } from "../components/Cartouche";
import { DUR, LINEAR } from "../tokens";

const CrossfadeImage: React.FC<{
  src: string;
  from: number;
  to: number;
}> = ({ src, from, to }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [from, from + 10, to - 10, to],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: LINEAR },
  );
  if (opacity <= 0) return null;
  return (
    <AbsoluteFill style={{ opacity }}>
      <SceneImage src={src} spanFrames={to - from + 20} voile="full" voileOpacity={0.5} />
    </AbsoluteFill>
  );
};

export const Bloc8Honnetete: React.FC = () => {
  const frame = useCurrentFrame();

  // The film's one deliberate cross-fade: reveal from black.
  const openFade = interpolate(frame, [0, DUR.slow], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: LINEAR,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#001F3F" }}>
      <CrossfadeImage src={staticFile("assets/images/g07_simulation_groupe.jpg")} from={0} to={150} />
      <CrossfadeImage src={staticFile("assets/images/g08_entrainement_concentree.jpg")} from={150} to={225} />
      <CrossfadeImage src={staticFile("assets/images/g09_femme_confiante_soir.jpg")} from={225} to={300} />

      {frame < 225 ? (
        <div style={{ position: "absolute", top: 680, left: 72, right: 72 }}>
          <MaskSlideText appearFrame={20} fontSize={64} color="#8A8F98">
            SOYONS CLAIRS.
          </MaskSlideText>
          <div style={{ height: 24 }} />
          <MaskSlideText appearFrame={80} fontSize={54} color="#FFFFFF">
            <Cartouche univers="sombre" appearFrame={80} fontSize={54}>
              DEUX MOIS DE VRAI TRAVAIL.
            </Cartouche>
          </MaskSlideText>
          <div style={{ height: 24 }} />
          <MaskSlideText appearFrame={140} fontSize={66} color="#FFFFFF">
            ENTRAÎNEMENT. SIMULATIONS.
            <br />
            PROFESSIONNELS RECONNUS.
          </MaskSlideText>
        </div>
      ) : null}

      {frame >= 225 ? (
        <div style={{ position: "absolute", top: 850, left: 72, right: 72 }}>
          <MaskSlideText appearFrame={225} fontSize={78} color="#FFFFFF">
            MÊME SI TU PENSES QUE
            <br />
            TU SAIS PAS VENDRE.
          </MaskSlideText>
        </div>
      ) : null}

      <AbsoluteFill style={{ backgroundColor: "#001F3F", opacity: openFade, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
