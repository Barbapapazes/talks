At Devoxx France, this talk explains Vite by following a request from the browser through its server, transformations, and plugins. It presents the three main module hooks, `resolveId`, `load`, and `transform`, then uses `vite-plugin-inspect` and small examples to make the pipeline visible.

The talk goes further with virtual modules, HMR over a WebSocket, and Nitro connected through Vite's `configureServer` hook. It ends with plugin ordering through `enforce` and the cost of calling every hook across the Rust and Node.js boundary in Rolldown.
