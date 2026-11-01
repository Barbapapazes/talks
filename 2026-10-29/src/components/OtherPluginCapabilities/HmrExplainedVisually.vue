<script lang="ts" setup>
import type { Request, WebSocketMessage } from '../../types/network-tab'
import appVueTransformed from 'virtual:vite-transformed-file:App:ts'
import indexHtml from 'virtual:vite-transformed-file:index:html'
import mainTs from 'virtual:vite-transformed-file:main:ts'
import Inspect from '../Inspect/Inspect.vue'

const hmrMessages: WebSocketMessage[] = [
  {
    id: 1,
    direction: 'received',
    payload: '{"type":"connected","clientId":"mixit-demo"}',
    time: '14:21:03.412',
    type: 'text',
  },
  {
    id: 2,
    direction: 'sent',
    payload: '{"type":"ping"}',
    time: '14:21:05.103',
    type: 'ping',
  },
  {
    id: 3,
    direction: 'received',
    payload: '{"type":"pong"}',
    time: '14:21:05.105',
    type: 'pong',
  },
  {
    id: 4,
    direction: 'received',
    payload: `{
  "type": "update",
  "updates": [
    {
      "type": "js-update",
      "path": "/src/App.vue",
      "acceptedPath": "/src/App.vue",
      "timestamp": 1772950866124
    }
  ]
}`,
    time: '14:21:08.624',
    type: 'text',
  },
]

const requests: Request[] = [
  {
    id: 1,
    name: 'localhost',
    method: 'GET',
    status: 200,
    protocol: 'http/1.1',
    type: 'document',
    time: 6,
    size: '0.7 kB',
    response: indexHtml,
    waterfallStart: 0,
    waterfallDuration: 6,
  },
  {
    id: 2,
    name: '@vite/client',
    url: '/@vite/client',
    method: 'GET',
    status: 200,
    protocol: 'http/1.1',
    type: 'script',
    initiator: '(index):4',
    time: 14,
    size: '185 kB',
    waterfallStart: 1,
    waterfallDuration: 14,
  },
  {
    id: 3,
    name: 'main.ts',
    method: 'GET',
    status: 200,
    protocol: 'http/1.1',
    type: 'script',
    initiator: '(index):13',
    time: 11,
    size: '0.5 kB',
    response: mainTs,
    waterfallStart: 6,
    waterfallDuration: 11,
  },
  {
    id: 5,
    name: 'App.vue',
    url: '/src/App.vue',
    method: 'GET',
    status: 200,
    protocol: 'http/1.1',
    type: 'script',
    initiator: 'main.ts:3',
    time: 13,
    size: '3.2 kB',
    response: appVueTransformed,
    waterfallStart: 17,
    waterfallDuration: 9,
  },
  {
    id: 4,
    name: 'vite-hmr',
    url: 'ws://localhost:5173/?token=mixit-hmr-demo',
    method: 'GET',
    status: 101,
    protocol: 'websocket',
    type: 'websocket',
    initiator: '@vite/client:744',
    time: 0,
    size: '0.0 kB',
    waterfallStart: 7,
    waterfallDuration: 38,
    webSocketMessages: hmrMessages,
  },
  {
    id: 5,
    name: 'App.vue?t=1772950866124',
    url: '/src/App.vue',
    method: 'GET',
    status: 200,
    protocol: 'http/1.1',
    type: 'script',
    initiator: '@vite/client:821',
    time: 13,
    size: '3.2 kB',
    response: appVueTransformed,
    waterfallStart: 30,
    waterfallDuration: 13,
  },
]
</script>

<template>
  <div class="flex min-h-0 flex-1 flex-col">
    <Inspect
      class="min-h-0 flex-1"
      active-tab="Network"
      :network="{
        requests,
      }"
    />
  </div>
</template>
