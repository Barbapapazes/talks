A tiny dependency such as `is-string` can appear throughout the JavaScript ecosystem even when almost nobody installs it directly. This talk uses `node-modules.dev`, `pkg-size`, DepTree, and `npmgraph` to inspect what projects actually download and how much of that material comes from transitive dependencies.

It then introduces e18e and its work on cleanup, speedup, and better packages. The examples point toward native replacements, module-replacement tooling, ESLint checks, and a concrete Storybook case.
