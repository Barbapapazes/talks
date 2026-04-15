<script lang="ts" setup>
import type { Container, ICoordinates, IDimension, IOptions, RecursivePartial } from '@tsparticles/engine'
import type { EmittersEngine } from '@tsparticles/plugin-emitters'
import { useIsSlideActive } from '@slidev/client'
import { tsParticles } from '@tsparticles/engine'
import { loadEmittersPlugin } from '@tsparticles/plugin-emitters'
import { loadSlim } from '@tsparticles/slim'
import { nextTick, onUnmounted, useId, watch } from 'vue'

interface RainProps {
  emojis: readonly string[]
}

const props = defineProps<RainProps>()

const EMITTER_SHAPE_NAME = 'full-width-strip'

class FullWidthStripShape {
  constructor(
    private position: ICoordinates,
    private size: IDimension,
  ) {}

  async init() {
    // no-op
  }

  resize(position: ICoordinates, size: IDimension) {
    this.position = position
    this.size = size
  }

  randomPosition() {
    const width = Math.max(this.size.width, 1)
    const height = Math.max(this.size.height, 1)
    const minX = this.position.x - width / 2
    const minY = this.position.y - height / 2

    return {
      position: {
        x: minX + Math.random() * width,
        y: minY + Math.random() * height,
      },
    }
  }
}

const baseOptions: RecursivePartial<IOptions> = {
  background: {
    color: {
      value: 'transparent',
    },
  },
  detectRetina: true,
  fpsLimit: 120,
  fullScreen: {
    enable: false,
    zIndex: 0,
  },
  particles: {
    number: {
      value: 0,
    },
  },
  pauseOnBlur: false,
}

function createEmitterOptions(emojis: readonly string[]) {
  return {
    autoPlay: true,
    direction: 'bottom',
    fill: true,
    life: {
      count: 0,
      wait: false,
    },
    particles: {
      move: {
        direction: 'bottom',
        enable: true,
        outModes: {
          bottom: 'destroy',
          default: 'destroy',
        },
        speed: {
          max: 3.8,
          min: 1.8,
        },
        straight: false,
      },
      opacity: {
        value: {
          max: 1,
          min: 0.7,
        },
      },
      rotate: {
        animation: {
          enable: true,
          speed: {
            max: 24,
            min: 10,
          },
        },
        direction: 'random',
        value: {
          max: 360,
          min: 0,
        },
      },
      shape: {
        options: {
          emoji: {
            padding: 2,
            value: emojis,
          },
        },
        type: 'emoji',
      },
      size: {
        value: {
          max: 28,
          min: 18,
        },
      },
    },
    position: {
      x: 50,
      y: 0,
    },
    rate: {
      delay: 0.08,
      quantity: 3,
    },
    shape: {
      options: {},
      type: EMITTER_SHAPE_NAME,
    },
    size: {
      height: 2,
      mode: 'percent',
      width: 100,
    },
    startCount: 0,
  } as const
}

const isActive = useIsSlideActive()
const containerId = `rain-${useId().replace(/:/g, '-')}`

let container: Container | null = null
let engineReady: Promise<void> | null = null
let activationVersion = 0

async function ensureEngineLoaded() {
  if (!engineReady) {
    engineReady = (async () => {
      const engine = tsParticles as EmittersEngine

      await loadSlim(engine)
      await loadEmittersPlugin(engine)
      engine.addEmitterShapeGenerator?.(EMITTER_SHAPE_NAME, {
        generate(position, size) {
          return new FullWidthStripShape(position, size)
        },
      })
    })()
  }

  await engineReady
}

function destroyRain() {
  if (container) {
    container.destroy()
    container = null
  }
}

async function startRain() {
  if (container || !props.emojis.length)
    return

  const createdContainer = await tsParticles.load({
    id: containerId,
    options: {
      ...baseOptions,
      emitters: createEmitterOptions(props.emojis),
    } as RecursivePartial<IOptions>,
  })

  if (!createdContainer)
    return

  container = createdContainer
}

watch(
  () => ({
    active: isActive.value,
    emojis: props.emojis.join('\u0000'),
  }),
  async ({ active }) => {
    activationVersion += 1
    const currentActivation = activationVersion

    destroyRain()

    if (!active)
      return

    await nextTick()
    await ensureEngineLoaded()

    if (currentActivation !== activationVersion)
      return

    await startRain()

    if (currentActivation !== activationVersion)
      destroyRain()
  },
  { immediate: true },
)

onUnmounted(() => {
  destroyRain()
})
</script>

<template>
  <div class="h-full">
    <div class="rain slidev-layout relative h-full overflow-hidden">
      <div :id="containerId" aria-hidden="true" class="pointer-events-none absolute inset-0 z-0" />

      <div class="relative z-10 h-full">
        <slot />
      </div>
    </div>
  </div>
</template>
