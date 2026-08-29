Cette présentation explique la réactivité frontend avec un système minimal fondé sur les signaux. Elle part de `ui = fn(state)` et utilise `alien-signals` pour relier les signaux, les computed et les effects dans un graphe de dépendances.

Les graphes orientés, les listes doublement chaînées et les propagations push et pull permettent de comprendre les mises à jour réactives. La conclusion relie ce modèle à `ReactiveEffect` et aux scopes de composants dans Vue.
