La réactivité frontend peut se comprendre comme un graphe de dépendances entre l'état, les valeurs calculées et les effets. Cette présentation part de l'équation `ui = fn(state)`, fait un détour par Excel et s'appuie sur `alien-signals` pour suivre la propagation d'un changement.

Elle présente les graphes orientés acycliques, le tri topologique et les listes doublement chaînées avant d'examiner les signaux, les abonnés, les dépendances et les stratégies push, pull et pull-push. La dernière partie relie ces mécanismes au fonctionnement de Vue.
