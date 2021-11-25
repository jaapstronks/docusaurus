/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs');

/** @type {import('@docusaurus/types').PluginConfig[]} */
const dogfoodingPluginInstances = [
  [
    '@docusaurus/plugin-content-docs',
    /** @type {import('@docusaurus/plugin-content-docs').Options} */
    ({
      id: 'docs-tests',
      routeBasePath: '/tests/docs',
      sidebarPath: '_dogfooding/docs-tests-sidebars.js',

      // Using a symlinked folder as source, test for use-case https://github.com/facebook/docusaurus/issues/3272
      // The target folder uses a _ prefix to test against an edge case regarding MDX partials: https://github.com/facebook/docusaurus/discussions/5181#discussioncomment-1018079
      path: fs.realpathSync('_dogfooding/docs-tests-symlink'),
    }),
  ],

  [
    '@docusaurus/plugin-content-blog',
    /** @type {import('@docusaurus/plugin-content-blog').Options} */
    ({
      id: 'blog-tests',
      path: '_dogfooding/_blog tests',
      routeBasePath: '/tests/blog',
      editUrl:
        'https://github.com/facebook/docusaurus/edit/main/website/_dogfooding/_blog-tests',
      postsPerPage: 3,
      feedOptions: {
        type: 'all',
        title: 'Docusaurus Tests Blog',
        copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`,
      },
      readingTime: ({content, frontMatter, defaultReadingTime}) =>
        frontMatter.hide_reading_time
          ? undefined
          : defaultReadingTime({content, options: {wordsPerMinute: 5}}),
    }),
  ],

  [
    '@docusaurus/plugin-content-pages',
    /** @type {import('@docusaurus/plugin-content-pages').Options} */
    ({
      id: 'pages-tests',
      path: '_dogfooding/_pages tests',
      routeBasePath: '/tests/pages',
    }),
  ],
];

exports.dogfoodingPluginInstances = dogfoodingPluginInstances;
