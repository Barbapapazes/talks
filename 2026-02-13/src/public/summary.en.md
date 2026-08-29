This talk investigates why JavaScript projects download packages that their developers never selected, using `is-string` as the entry point. `node-modules.dev`, `pkg-size`, DepTree, and `npmgraph` make the dependency tree visible and help compare package code with the surrounding metadata and transitive dependencies.

The second half presents e18e, native alternatives, module replacements, and `eslint-plugin-depend` as ways to reduce unnecessary dependencies. The discussion closes with a Storybook 8.2 example and a practical invitation to inspect the packages already present in a project.
