<template>
  <InteractiveTalks
    v-slot="{ question, answers }"
    :slide="24"
    talk-slug="decouvrons-ensemble-l'ecosysteme-unjs"
    question-slug="votre-paquet-prefere"
  >
    <MostLoved :question="question" :answers="answers" />
  </InteractiveTalks>
</template>
