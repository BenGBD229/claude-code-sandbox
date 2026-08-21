import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Grain } from "./components/Grain";
import { Bloc1Hook } from "./blocs/Bloc1Hook";
import { Bloc2Annonce } from "./blocs/Bloc2Annonce";
import { Bloc3Metiers } from "./blocs/Bloc3Metiers";
import { Bloc4DepuisChezToi } from "./blocs/Bloc4DepuisChezToi";
import { Bloc5Certification } from "./blocs/Bloc5Certification";
import { Bloc6Reseau } from "./blocs/Bloc6Reseau";
import { Bloc7Outils } from "./blocs/Bloc7Outils";
import { Bloc8Honnetete } from "./blocs/Bloc8Honnetete";
import { Bloc9Cta } from "./blocs/Bloc9Cta";
import { fontFamily } from "./tokens";

const PREMOUNT = 30;

export const GuitaniPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: "#001F3F" }}>
      <Sequence  durationInFrames={270} premountFor={PREMOUNT} name="Bloc 1 — Hook">
        <Bloc1Hook />
      </Sequence>
      <Sequence from={270} durationInFrames={270} premountFor={PREMOUNT} name="Bloc 2 — Annonce">
        <Bloc2Annonce />
      </Sequence>
      <Sequence from={540} durationInFrames={240} premountFor={PREMOUNT} name="Bloc 3 — Les 4 métiers">
        <Bloc3Metiers />
      </Sequence>
      <Sequence from={780} durationInFrames={210} premountFor={PREMOUNT} name="Bloc 4 — Depuis chez toi">
        <Bloc4DepuisChezToi />
      </Sequence>
      <Sequence from={990} durationInFrames={210} premountFor={PREMOUNT} name="Bloc 5 — Certification">
        <Bloc5Certification />
      </Sequence>
      <Sequence from={1200} durationInFrames={240} premountFor={PREMOUNT} name="Bloc 6 — Réseau">
        <Bloc6Reseau />
      </Sequence>
      <Sequence from={1440} durationInFrames={240} premountFor={PREMOUNT} name="Bloc 7 — Outils + coaching">
        <Bloc7Outils />
      </Sequence>
      <Sequence from={1680} durationInFrames={300} premountFor={PREMOUNT} name="Bloc 8 — Honnêteté">
        <Bloc8Honnetete />
      </Sequence>
      <Sequence from={1980} durationInFrames={300} premountFor={PREMOUNT} name="Bloc 9 — CTA">
        <Bloc9Cta />
      </Sequence>

      <Grain />

      <Audio src={staticFile("assets/audio/voix_off.mp3")} volume={1} />
    </AbsoluteFill>
  );
};
