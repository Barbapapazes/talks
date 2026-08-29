Vite traite les requêtes entre les fichiers d'un projet et le navigateur. Cette présentation montre comment il transforme à la volée les imports d'images et d'autres formats afin de renvoyer du JavaScript compréhensible par le navigateur, puis comment il prépare le code pour la production.

Elle présente la structure d'un plugin et ses trois hooks principaux, `resolveId`, `load` et `transform`. La dernière partie explique aussi les modules virtuels, qui permettent à un plugin de générer du code pour un module qui n'existe pas sur le disque.
