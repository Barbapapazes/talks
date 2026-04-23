<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'
import { computed, useAttrs, useSlots } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ModalProps>(), {
  title: undefined,
  description: undefined,
  showClose: true,
  closeLabel: 'Close modal',
})

defineSlots<Partial<ModalSlots>>()

interface ModalProps {
  title?: string
  description?: string
  showClose?: boolean
  closeLabel?: string
}

interface ModalSlots {
  default: (props: { close: () => void }) => any
  title: () => any
  description: () => any
  footer: (props: { close: () => void }) => any
}

const attrs = useAttrs()
const slots = useSlots()

const open = defineModel<boolean>('open', {
  default: false,
})

const hasTitle = computed(() => Boolean(props.title || slots.title))
const hasDescription = computed(() => Boolean(props.description || slots.description))
const hasHeader = computed(() => hasTitle.value || hasDescription.value)
const contentAttrs = computed(() => ({
  ...attrs,
  ...(hasDescription.value ? {} : { 'aria-describedby': undefined }),
  ...(hasTitle.value ? {} : { 'aria-labelledby': undefined }),
}))
</script>

<template>
  <DialogRoot v-slot="{ close }" v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]" />

      <DialogContent
        v-bind="contentAttrs"
        class="fixed left-1/2 top-1/2 z-50 flex h-3/4 w-11/12 max-w-6xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-md border border-neutral-200 bg-white text-neutral-900 shadow-lg outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
      >
        <div
          v-if="hasHeader"
          class="shrink-0 border-b border-neutral-200 px-4 py-3 pr-12 dark:border-neutral-700"
        >
          <DialogTitle
            v-if="hasTitle"
            class="text-2xl font-semibold text-neutral-700 dark:text-neutral-100"
          >
            <slot name="title">
              {{ props.title }}
            </slot>
          </DialogTitle>

          <DialogDescription
            v-if="hasDescription"
            class="mt-1 text-lg text-neutral-500 dark:text-neutral-400"
          >
            <slot name="description">
              {{ props.description }}
            </slot>
          </DialogDescription>
        </div>

        <slot :close="close" />

        <div
          v-if="$slots.footer"
          class="shrink-0 border-t border-neutral-200 px-4 py-3 dark:border-neutral-700"
        >
          <slot name="footer" :close="close" />
        </div>

        <DialogClose
          v-if="props.showClose"
          :aria-label="props.closeLabel"
          class="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full text-2xl leading-none text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
        >
          <span aria-hidden="true">×</span>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
