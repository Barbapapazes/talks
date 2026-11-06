Slides are always in english.

Read ./design.md when you have to create a new component.

## Generated README files

Do not edit the root README or talk README files manually.

Regenerate README files from the repository root with the scripts in `package.json`:

- `npm run generate:readme` regenerates the root `README.md`.
- `npm run generate:talk-readme` regenerates all talk README files.

## Timing

To update timing use `npm run update:timing <path_to_talk>`.

## Tests

All components in the `theme` directory should be tested. However, others components and scripts in `.scripts` don't need to be tested.
