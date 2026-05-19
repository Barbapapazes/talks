import { useNav } from '@slidev/client'
import { computed } from 'vue'

interface ChooseNextSlideFrontmatter {
  chooseNextSlide?: boolean
  choices?: string[]
  inalia?: {
    questionId?: number
  }
}

interface SlideWithChooseNextSlide {
  frontmatter?: ChooseNextSlideFrontmatter
}

export function useChooseNextSlide() {
  const { currentSlideRoute, slides, go, clicks, clicksTotal } = useNav()

  const currentSlide = computed(() => {
    return currentSlideRoute.value?.meta.slide as SlideWithChooseNextSlide | undefined
  })

  const frontmatter = computed(() => currentSlide.value?.frontmatter)

  const showChooseNextSlide = computed(() => !!frontmatter.value?.chooseNextSlide)

  const questionId = computed(() => frontmatter.value?.inalia?.questionId)

  const singleChoiceName = computed(() => {
    if (frontmatter.value?.choices?.length !== 1) {
      return undefined
    }

    return frontmatter.value.choices[0]
  })

  const canJumpToNextSlideChoice = computed(() => {
    return !!singleChoiceName.value && clicks.value === clicksTotal.value
  })

  function goToSlideChoice(choiceName: string) {
    const target = slides.value.find(slide => slide.meta.name === choiceName)

    if (!target) {
      throw new Error(`Target slide "${choiceName}" not found`)
    }

    go(target.no)
  }

  return {
    canJumpToNextSlideChoice,
    currentSlide,
    frontmatter,
    goToSlideChoice,
    questionId,
    showChooseNextSlide,
    singleChoiceName,
  }
}
