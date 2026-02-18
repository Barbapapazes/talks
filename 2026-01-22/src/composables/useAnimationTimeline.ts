import type { Ref } from 'vue'
import { nextTick, ref } from 'vue'

export type Phase = 'idle' | 'waitingToType' | 'typingInInput' | 'waitingToSend' | 'sending' | 'searching' | 'thinking' | 'streaming' | 'done'

export interface AnimationConfig {
  userPrompt: string
  typewriterCharDelayMs: number
  searchDurationMs: number
  thinkingDurationMs: number
  streamFrameDelayMs: number
  streamFramesPerTick: number
  totalFrames: number
  timingVariance?: number // Percentage variance for randomization (default 0.2 = 20%)
}

export interface AnimationState {
  currentPhase: Ref<Phase>
  typedInputText: Ref<string>
  sentUserText: Ref<string>
  currentFrameIndex: Ref<number>
  showCursor: Ref<boolean>
}

/**
 * Adds random variance to a base time value
 * @param baseTime - The base time in milliseconds
 * @param variance - The variance as a percentage (e.g., 0.2 = ±20%)
 */
function randomizeTime(baseTime: number, variance: number = 0.2): number {
  const min = baseTime * (1 - variance)
  const max = baseTime * (1 + variance)
  return Math.random() * (max - min) + min
}

export function useAnimationTimeline(
  config: AnimationConfig,
  chatContainerRef: Ref<HTMLElement | null>,
  onScroll: () => void,
) {
  const currentPhase = ref<Phase>('idle')
  const typedInputText = ref('')
  const sentUserText = ref('')
  const currentFrameIndex = ref(0)
  const showCursor = ref(true)

  const timers = ref<number[]>([])
  const intervals = ref<number[]>([])
  let spacebarListener: ((e: KeyboardEvent) => void) | null = null
  let continueCallback: (() => void) | null = null

  const variance = config.timingVariance ?? 0.2

  function scrollToBottom() {
    if (chatContainerRef.value) {
      nextTick(() => {
        if (chatContainerRef.value) {
          chatContainerRef.value.scrollTop = chatContainerRef.value.scrollHeight
          onScroll()
        }
      })
    }
  }

  function waitForSpacebar(onSpacePressed: () => void) {
    // Remove existing listener if any
    if (spacebarListener) {
      window.removeEventListener('keydown', spacebarListener)
    }

    // Create new listener
    spacebarListener = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.code === 'Enter' || e.code === 'NumpadEnter') {
        e.preventDefault()
        if (spacebarListener) {
          window.removeEventListener('keydown', spacebarListener)
          spacebarListener = null
        }
        onSpacePressed()
      }
    }

    window.addEventListener('keydown', spacebarListener)
    continueCallback = onSpacePressed
  }

  function startTypewriterInInput(text: string, onComplete: () => void) {
    let charIndex = 0
    typedInputText.value = ''

    const typeNextChar = () => {
      if (charIndex < text.length) {
        typedInputText.value += text[charIndex]
        charIndex++

        // Randomize delay for each character
        const delay = randomizeTime(config.typewriterCharDelayMs, variance)
        const timer = window.setTimeout(typeNextChar, delay)
        timers.value.push(timer)
      }
      else {
        showCursor.value = false
        onComplete()
      }
    }

    typeNextChar()
  }

  function clearAllTimers() {
    timers.value.forEach(t => clearTimeout(t))
    intervals.value.forEach(i => clearInterval(i))
    timers.value = []
    intervals.value = []

    // Remove spacebar listener if active
    if (spacebarListener) {
      window.removeEventListener('keydown', spacebarListener)
      spacebarListener = null
    }
    continueCallback = null
  }

  function resetAnimation() {
    clearAllTimers()
    currentPhase.value = 'idle'
    typedInputText.value = ''
    sentUserText.value = ''
    currentFrameIndex.value = 0
    showCursor.value = true
  }

  function startTimeline() {
    resetAnimation()

    // Phase 1: Waiting for spacebar to start typing
    currentPhase.value = 'waitingToType'
    waitForSpacebar(() => {
      // Phase 2: Typing in input field
      currentPhase.value = 'typingInInput'
      startTypewriterInInput(config.userPrompt, () => {
        // Phase 3: Waiting for spacebar to send
        currentPhase.value = 'waitingToSend'
        waitForSpacebar(() => {
          // Phase 4: Sending (brief pause, then move text to chat)
          const sendDelay = randomizeTime(300, variance)
          const sendTimer = window.setTimeout(() => {
            currentPhase.value = 'sending'
            sentUserText.value = typedInputText.value
            typedInputText.value = ''
            scrollToBottom()

            // Phase 3: Searching
            const searchDelay = randomizeTime(500, variance)
            const searchTimer = window.setTimeout(() => {
              currentPhase.value = 'searching'
              scrollToBottom()

              // Phase 4: Thinking
              const searchDuration = randomizeTime(config.searchDurationMs, variance)
              const thinkingTimer = window.setTimeout(() => {
                currentPhase.value = 'thinking'
                scrollToBottom()

                // Phase 5: Streaming
                const thinkingDuration = randomizeTime(config.thinkingDurationMs, variance)
                const streamingTimer = window.setTimeout(() => {
                  currentPhase.value = 'streaming'
                  currentFrameIndex.value = 0

                  // Stream frames
                  const streamInterval = window.setInterval(() => {
                    if (currentFrameIndex.value < config.totalFrames - 1) {
                      currentFrameIndex.value += config.streamFramesPerTick
                      if (currentFrameIndex.value >= config.totalFrames) {
                        currentFrameIndex.value = config.totalFrames - 1
                      }
                      scrollToBottom()
                    }
                    else {
                      clearInterval(streamInterval)
                      currentPhase.value = 'done'
                    }
                  }, randomizeTime(config.streamFrameDelayMs, variance * 0.5)) // Less variance for smoother streaming

                  intervals.value.push(streamInterval)
                }, thinkingDuration)

                timers.value.push(streamingTimer)
              }, searchDuration)

              timers.value.push(thinkingTimer)
            }, searchDelay)

            timers.value.push(searchTimer)
          }, sendDelay)

          timers.value.push(sendTimer)
        })
      })
    })
  }

  function continueAnimation() {
    if (continueCallback) {
      continueCallback()
    }
  }

  return {
    currentPhase,
    typedInputText,
    sentUserText,
    currentFrameIndex,
    showCursor,
    startTimeline,
    resetAnimation,
    continueAnimation,
  }
}
