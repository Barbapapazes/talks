À Devoxx France, cette conférence suit une requête du navigateur à travers le serveur Vite, ses transformations et ses plugins. Elle présente les trois hooks principaux des modules, `resolveId`, `load` et `transform`, puis rend la pipeline concrète avec `vite-plugin-inspect` et plusieurs petits exemples.

La suite explique les modules virtuels, le HMR via une connexion WebSocket et l'intégration de Nitro avec le hook `configureServer`. La conclusion traite de l'ordre des plugins avec `enforce` et du coût des appels de hooks entre Rust et Node.js dans Rolldown.
