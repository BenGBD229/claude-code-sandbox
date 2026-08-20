# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## AI skills

This project has the official [Remotion skills](https://www.remotion.dev/docs/ai/skills) installed in
`.agents/skills/` (symlinked into `.claude/skills/` for Claude Code). They give the agent
up-to-date guidance on Remotion best practices, captions, interactivity, maps, markup,
multimedia, rendering, SaaS templates, the Studio, and upgrading. Run `npx remotion skills update`
to keep them current.

## Rendering in restricted sandboxes

If `npx remotion render` fails to download Chrome Headless Shell because outbound network
access is restricted, set `REMOTION_BROWSER_EXECUTABLE` in `.env` (see `.env.example`) to a
preinstalled Chromium/Chrome-Headless-Shell binary. `remotion.config.ts` will pick it up
automatically when the path exists, and falls back to Remotion's default download otherwise.

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
