---
id: typescript-support
title: TypeScript Support
---

Docusaurus is written in TypeScript, and provides first-class TypeScript support.

## Initialization {#initialization}

Docusaurus supports writing and using TypeScript theme components. If the init template provides a Typescript variant, you can directly initialize a site with full TypeScript support by using the `--typescript` flag.

```bash
npx create-docusaurus@latest my-website classic --typescript
```

Below are some guides on how to migrate an existing project to TypeScript.

## Setup {#setup}

To start using TypeScript, add `@docusaurus/module-type-aliases` and the base TS config to your project:

```bash npm2yarn
npm install --save-dev typescript @docusaurus/module-type-aliases @tsconfig/docusaurus
```

Then add `tsconfig.json` to your project root with the following content:

```json title="tsconfig.json"
{
  "extends": "@tsconfig/docusaurus/tsconfig.json",
  "include": ["src/"]
}
```

Docusaurus doesn't use this `tsconfig.json` to compile your project. It is added just for a nicer Editor experience, although you can choose to run `tsc` to type check your code for yourself or on CI.

Now you can start writing TypeScript theme components.

## Typing the config file {#typing-config}

It is **not possible** to use a TypeScript config file in Docusaurus, unless you compile it yourself to JavaScript.

We recommend using [JSDoc type annotations](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html):

```js title="docusaurus.config.js"
// highlight-start
// @ts-check
// highlight-end

// highlight-start
/** @type {import('@docusaurus/types').Plugin} */
// highlight-end
function MyPlugin(context, options) {
  return {
    name: 'my-plugin',
  };
}

// highlight-start
/** @type {import('@docusaurus/types').Config} */
// highlight-end
const config = {
  title: 'Docusaurus',
  tagline: 'Build optimized websites quickly, focus on your content',
  organizationName: 'facebook',
  projectName: 'docusaurus',
  plugins: [MyPlugin],
  presets: [
    [
      '@docusaurus/preset-classic',
      // highlight-start
      /** @type {import('@docusaurus/preset-classic').Options} */
      // highlight-end
      ({
        docs: {
          path: 'docs',
          sidebarPath: 'sidebars.js',
        },
        blog: {
          path: 'blog',
          postsPerPage: 5,
        },
      }),
    ],
  ],
  themeConfig:
    // highlight-start
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    // highlight-end
    ({
      colorMode: {
        defaultMode: 'dark',
      },
      navbar: {
        hideOnScroll: true,
        title: 'Docusaurus',
        logo: {
          alt: 'Docusaurus Logo',
          src: 'img/docusaurus.svg',
          srcDark: 'img/docusaurus_keytar.svg',
        },
      },
    }),
};

module.exports = config;
```

:::tip

Type annotations are very useful and help your IDE understand the type of config objects!

The best IDEs (VSCode, WebStorm, Intellij...) will provide a nice auto-completion experience.

:::

:::info

By default, the Docusaurus TypeScript config does not type-check JavaScript files.

The `// @ts-check` comment ensures the config file is properly type-checked when running:

```bash npm2yarn
npm run tsc
```

:::

## Swizzling TypeScript theme components {#swizzling-typescript-theme-components}

For themes that supports TypeScript theme components, you can add the `--typescript` flag to the end of swizzling command to get TypeScript source code. For example, the following command will generate `index.tsx` and `styles.module.css` into `src/theme/Footer`.

```bash npm2yarn
npm run swizzle @docusaurus/theme-classic Footer -- --typescript
```

At this moment, the only official Docusaurus theme that supports TypeScript theme components is `@docusaurus/theme-classic`. If you are a Docusaurus theme package author who wants to add TypeScript support, see the [Lifecycle APIs docs](./api/lifecycle-apis.md#gettypescriptthemepath).
