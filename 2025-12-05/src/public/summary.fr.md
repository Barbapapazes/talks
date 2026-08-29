Le rendu réactif repose sur la connaissance des relations entre l'état et les calculs qui l'utilisent. Cette présentation explore ces relations avec `alien-signals`, depuis les API `signal`, `computed` et `effect` jusqu'aux structures de données qui suivent les dépendances.

Elle explique la propagation des changements, les difficultés liées aux cycles et à l'état mutable, puis montre comment construire un petit framework piloté par les signaux. Un dernier exemple fait le lien avec `ReactiveEffect` dans Vue.
