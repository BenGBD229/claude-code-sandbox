import "./index.css";
import { Composition } from "remotion";
import { GuitaniPromo } from "./GuitaniPromo";
import { DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH } from "./GuitaniPromo/tokens";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GuitaniPromo"
        component={GuitaniPromo}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
