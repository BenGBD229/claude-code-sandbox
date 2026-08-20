// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { existsSync } from "node:fs";
import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideBundlerConfig(enableTailwind);

// Some sandboxes block downloading Remotion's own Chrome Headless Shell.
// If REMOTION_BROWSER_EXECUTABLE is set (see .env), use that browser instead.
// If it's unset or the path doesn't exist, Remotion falls back to its default download.
const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE;
if (browserExecutable && existsSync(browserExecutable)) {
	Config.setBrowserExecutable(browserExecutable);
}
