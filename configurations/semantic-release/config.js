module.exports = {
  branches: [
    { name: 'master' },
    { name: 'next' },
    { name: 'pre/rc', channel: 'pre/rc', prerelease: 'rc' },
    { name: 'beta', channel: 'beta', prerelease: 'beta' },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/npm',
      {
        tarballDir: 'release',
      },
    ],
    // documentation https://github.com/semantic-release/github#readme
    [
      '@semantic-release/github',
      {
        assets: [
          { path: 'release/*.tgz' },
          { path: 'lib/navigator.js*(.map)', label: 'CJS build' },
          { path: 'lib/navigator.min.js*(.map)', label: 'CJS build minified' },
          { path: 'lib/navigator.umd.js*(.map)', label: 'UMD build' },
          { path: 'lib/navigator.umd.min.js*(.map)', label: 'UMD build minified' },
        ],
      },
    ],
    [
      '@semantic-release/git',
      {
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        assets: ['CHANGELOG.md', 'AUTHORS.md', 'package.json', 'yarn.lock', 'npm-shrinkwrap.json']
      },
    ],
  ],
};
