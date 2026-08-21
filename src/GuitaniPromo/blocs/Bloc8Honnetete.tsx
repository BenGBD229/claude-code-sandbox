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
      <CrossfadeImage src={staticFile("assets/images/g07_simulation_groupe.jpg")} from={0} to={140} />
      <CrossfadeImage src={staticFile("assets/images/g08_entrainement_concentree.jpg")} from={140} to={215} />
      <CrossfadeImage src={staticFile("assets/images/g09_femme_confiante_soir.jpg")} from={215} to={300} />

      {/* Voice: "on va être clair" already plays out in bloc 7; this bloc
          opens right on "c'est 2 mois de vrai travail" (1680-1710, local
          0-30), then "d'entraînement... professionnels reconnus" runs
          through local 150. */}
      {frame < 150 ? (
        <div style={{ position: "absolute", top: 680, left: 72, right: 72 }}>
          <MaskSlideText appearFrame={0} fontSize={54} color="#FFFFFF">
            <Cartouche univers="sombre" appearFrame={0} fontSize={54}>
              DEUX MOIS DE VRAI TRAVAIL.
            </Cartouche>
          </MaskSlideText>
          <div style={{ height: 24 }} />
          <MaskSlideText appearFrame={30} fontSize={66} color="#FFFFFF">
            ENTRAÎNEMENT. SIMULATIONS.
            <br />
            PROFESSIONNELS RECONNUS.
          </MaskSlideText>
        </div>
      ) : null}

      {/* Voice: "même si tu penses aujourd'hui que tu sais pas vendre." =
          1830-1890 (local 150-210). */}
      {frame >= 150 ? (
        <div style={{ position: "absolute", top: 850, left: 72, right: 72 }}>
          <MaskSlideText appearFrame={150} fontSize={78} color="#FFFFFF">
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
