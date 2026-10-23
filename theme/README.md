# Slidev Personal Theme

This is a custom theme for Slidev that matches my personal website.

## Talk visualization

Open `/_visualize` or use the graph button in Slidev's navigation controls. The graph opens in a new tab and works for every deck using this theme, including linear talks.

- Slides without `choices` connect to the next slide.
- `choices: [name, other-name]` connects to slides with those `name` values.
- `choices: []` ends a path.
- `group` clusters slides. Green borders mark `ready` slides, yellow marks choices, and purple marks the `recap` layout. Labels include `timing` when present.

The header shows the summed slide timing in minutes and seconds, including every branch. This is the total for all slides, not the duration of a particular path.

Click a node to open its slide in a new tab. Drag to pan, scroll to zoom, or use the zoom and fit buttons. The focused graph also accepts `+`, `-`, and `0` for zoom and fit.

In development, the plugin generates graph data on the first request and refreshes it when Markdown changes, including imported slides. Diagnostics appear on the page without stopping the presentation.

Builds emit `_visualize/index.html`, bundled assets, and `graph.json`. These files work on a static host under the talk's configured base path. Invalid choices, duplicate names, and Markdown parser errors fail the build. Production graph data does not include local source paths.

The plugin lives in `plugins/visualize.ts` and is registered through `setup/vite-plugins.ts` to obtain Slidev's active entry and parser options.
