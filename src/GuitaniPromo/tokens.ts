import { Easing, staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";

// Self-hosted (public/assets/fonts/) rather than fetched from Google Fonts at
// render time: the sandbox's headless Chromium doesn't trust the network
// egress proxy's intercepting CA for third-party font CDNs.
export const fontFamily = "Montserrat";

loadFont({
  family: fontFamily,
  url: staticFile("assets/fonts/Montserrat-Black.woff2"),
  weight: "900",
});

// ---------------------------------------------------------------------------
// Color system (Guitani brand) — see brief §1.1 / client hex sheet
// ---------------------------------------------------------------------------
export const COLORS = {
  sombreBg: "#001F3F",
  sombreHalo: "#0A2A4D",
  accentBg: "#C5A059",
  bronze: "#A37E41",
  clairBg: "#F7F5F0",
  textWhite: "#FFFFFF",
  textEncre: "#1A1A1A",
  validationGreen: "#0E7A5F",
} as const;

export type Univers = "sombre" | "accent" | "clair";

export const universBg: Record<Univers, string> = {
  sombre: COLORS.sombreBg,
  accent: COLORS.accentBg,
  clair: COLORS.clairBg,
};

export const universText: Record<Univers, string> = {
  sombre: COLORS.textWhite,
  accent: COLORS.textEncre,
  clair: COLORS.textEncre,
};

// Cartouche colors depend on the universe it sits on (brief §1.2)
export const cartoucheColors: Record<
  Univers,
  { bg: string; text: string }
> = {
  sombre: { bg: COLORS.accentBg, text: COLORS.textEncre },
  clair: { bg: COLORS.accentBg, text: COLORS.textEncre },
  accent: { bg: COLORS.textEncre, text: COLORS.accentBg },
};

// ---------------------------------------------------------------------------
// Timing tokens (brief §1.3) — in frames at 30fps
// ---------------------------------------------------------------------------
export const DUR = {
  instant: 4,
  fast: 8,
  base: 14,
  slow: 22,
} as const;

export const STAGGER = 6;

export const EASE_OUT_EXPO = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);
export const EASE_IN_SHARP = Easing.bezier(0.7, 0, 0.84, 0);
export const LINEAR = Easing.linear;

// ---------------------------------------------------------------------------
// Video-wide constants
// ---------------------------------------------------------------------------
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION_IN_FRAMES = 2280; // 76s = 72s voix + 4s carton final
