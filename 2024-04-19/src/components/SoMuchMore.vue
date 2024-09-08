<template>
  <InteractiveTalks
    v-slot="{ question, answers }"
    :slide="14"
    talk-slug="unifie-et-universel-le-javascript-avec-unjs"
    question-slug="votre-paquet-prefere"
  >
    <MostLoved :question="question" :answers="answers" />
  </InteractiveTalks>
</template>
