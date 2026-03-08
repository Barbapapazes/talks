<script lang="ts" setup>
import type { Edge, Node } from '@vue-flow/core'
import dagre from '@dagrejs/dagre'
import { onSlideEnter } from '@slidev/client'
import { Background } from '@vue-flow/background'
import { Position, useVueFlow, VueFlow } from '@vue-flow/core'
import { nextTick, ref } from 'vue'
import { useHighlight } from '../composables/useHighlight'
import HookNode from './HookNode.vue'

interface PipelineProps {
  plugins: {
    name: string
    resolveId: {
      input: { code: string, language: string } | null
      output: { code: string, language: string } | null
    }
    load: {
      input: { code: string, language: string } | null
      output: { code: string, language: string } | null
    }
    transform: {
      input: { code: string, language: string } | null
      output: { code: string, language: string } | null
    }
  }[]
}
const props = defineProps<PipelineProps>()

const nodes = ref<Node[]>([
  {
    id: 'request',
    type: 'request',
    data: {
      label: 'Request',
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'response',
    type: 'response',
    data: {
      label: 'Response',
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'resolveId',
    type: 'hook',
    data: {
      label: 'resolveId',
      plugins: props.plugins.map(plugin => ({
        name: plugin.name,
        input: plugin.resolveId.input,
        output: plugin.resolveId.output,
      })),
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'load',
    type: 'hook',
    data: {
      label: 'load',
      plugins: props.plugins.map(plugin => ({
        name: plugin.name,
        input: plugin.load.input,
        output: plugin.load.output,
      })),
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'transform',
    type: 'hook',
    data: {
      label: 'transform',
      plugins: props.plugins.map(plugin => ({
        name: plugin.name,
        input: plugin.transform.input,
        output: plugin.transform.output,
      })),
    },
    position: { x: 0, y: 0 },
  },
])

const edges = ref<Edge[]>([
  {
    id: 'e-request-resolveId',
    source: 'request',
    target: 'resolveId',
    type: 'smoothstep',
    animated: true,
  },
  {
    id: 'e-resolveId-load',
    source: 'resolveId',
    target: 'load',
    type: 'smoothstep',
    animated: true,
  },
  {
    id: 'e-load-transform',
    source: 'load',
    target: 'transform',
    type: 'smoothstep',
    animated: true,
  },
  {
    id: 'e-transform-response',
    source: 'transform',
    target: 'response',
    type: 'smoothstep',
    animated: true,
  },
])

/**
 * Composable to run the dagre layout algorithm on the graph.
 */
function useLayout() {
  const { findNode } = useVueFlow()

  const graph = ref(new dagre.graphlib.Graph())

  function layout(nodes: Node[], edges: Edge[], direction: string) {
    const dagreGraph = new dagre.graphlib.Graph()
    graph.value = dagreGraph

    dagreGraph.setDefaultEdgeLabel(() => ({}))
    dagreGraph.setGraph({ rankdir: direction, nodesep: 40, ranksep: 40 })

    const isHorizontal = direction === 'LR'

    for (const node of nodes) {
      const graphNode = findNode(node.id)
      dagreGraph.setNode(node.id, {
        width: graphNode?.dimensions.width || 150,
        height: graphNode?.dimensions.height || 50,
      })
    }

    for (const edge of edges) {
      dagreGraph.setEdge(edge.source, edge.target)
    }

    dagre.layout(dagreGraph)

    return nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id)
      const graphNode = findNode(node.id)
      const w = graphNode?.dimensions.width || 150
      const h = graphNode?.dimensions.height || 50
      return {
        ...node,
        targetPosition: isHorizontal ? Position.Left : Position.Top,
        sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
        position: { x: nodeWithPosition.x - w / 2, y: nodeWithPosition.y - h / 2 },
      }
    })
  }

  return { graph, layout }
}

const { fitView } = useVueFlow()

const { layout } = useLayout()
async function layoutGraph(direction: 'TB' | 'LR' = 'TB') {
  nodes.value = layout(nodes.value, edges.value, direction)

  nextTick(() => {
    fitView()
  })
}
const show = ref(false)
onSlideEnter(() => {
  nextTick(() => {
    show.value = true
  })
})

const selectedPlugin = ref<{
  name: string
  hook: string
  input: { code: string, language: string } | null
  output: { code: string, language: string } | null
} | undefined>(undefined)
function onPluginClick(hookName: string, pluginName: string) {
  const plugin = props.plugins.find(p => p.name === pluginName)

  if (!plugin)
    return

  selectedPlugin.value = {
    name: pluginName,
    hook: hookName,
    input: plugin[hookName as keyof Omit<typeof plugin, 'name'>].input,
    output: plugin[hookName as keyof Omit<typeof plugin, 'name'>].output,
  }
}

const { highlight } = useHighlight()
</script>

<template>
  <div class="h-full w-full flex flex-row">
    <div v-if="show" class="h-full w-1/2">
      <VueFlow
        :nodes="nodes"
        :edges="edges"
        :pan-on-drag="false"
        :zoom-on-scroll="false"
        :nodes-draggable="false"
        :nodes-connectable="false"
        :min-zoom="1"
        :max-zoom="1"
        @nodes-initialized="layoutGraph()"
      >
        <template #node-request="requestProps">
          <div>
            request
          </div>
        </template>

        <template #node-response="responseProps">
          <div>
            response
          </div>
        </template>

        <template #node-hook="hookProps">
          <HookNode
            v-bind="hookProps"
            :selected-plugin="selectedPlugin" @plugin-click="onPluginClick"
          />
        </template>

        <Background />
      </VueFlow>
    </div>

    <div class="w-1/2 h-full grid grid-rows-2">
      <!-- TODO: input -->
      <div>
        <div
          v-if="selectedPlugin && selectedPlugin.input"
          v-html="highlight(selectedPlugin.input.code, selectedPlugin.input.language)"
        />
      </div>
      <!-- TODO: output -->
      <div class="overflow-y-scroll">
        <div
          v-if="selectedPlugin && selectedPlugin.output"
          v-html="highlight(selectedPlugin.output.code, selectedPlugin.output.language)"
        />
        <div
          v-if="selectedPlugin && selectedPlugin.output"
          v-html="highlight(selectedPlugin.output.code, selectedPlugin.output.language)"
        />
        <div
          v-if="selectedPlugin && selectedPlugin.output"
          v-html="highlight(selectedPlugin.output.code, selectedPlugin.output.language)"
        />
      </div>
    </div>
  </div>
</template>

<style>
@import '@vue-flow/core/dist/style.css';
</style>
