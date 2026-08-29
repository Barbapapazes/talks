Vite is a request pipeline that transforms modules between a project and the browser. This talk explains its development server, production bundler, and plugin model through CSS, images, JSX, virtual modules, generated routes, virtual data, icons, and build information.

It then builds plugins with `resolveId`, `load`, and `transform`, before showing how lifecycle hooks such as `config`, `configResolved`, `buildStart`, and `buildEnd` extend Vite's behavior. The examples make the path from a source import to generated browser code explicit.
