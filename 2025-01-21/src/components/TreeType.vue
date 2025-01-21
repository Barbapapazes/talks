<script lang="ts" setup>
const items = [
  {
    title: 'app',
    icon: 'i-vscode-icons-folder-type-app',
    iconOpened: 'i-vscode-icons-folder-type-app-opened',
    children: [
      {
        title: 'controllers',
        icon: 'i-vscode-icons-folder-type-controller',
        iconOpened: 'i-vscode-icons-folder-type-controller-opened',
        children: [
          {
            title: 'auth_controller.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
          {
            title: 'users_controllers.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
        ],
      },
      {
        title: 'enums',
        children: [
          {
            title: 'roles.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
        ],
      },
      {
        title: 'events',
        icon: 'i-vscode-icons-folder-type-notification',
        iconOpened: 'i-vscode-icons-folder-type-notification-opened',
        children: [
          {
            title: 'user_created.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
        ],
      },
      {
        title: 'exceptions',
        children: [
          {
            title: 'app_exceptions.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
        ],
      },
      {
        title: 'listeners',
        children: [
          {
            title: 'user_created_listener.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
        ],
      },
      {
        title: 'middleware',
        icon: 'i-vscode-icons-folder-type-middleware',
        iconOpened: 'i-vscode-icons-folder-type-middleware-opened',
        children: [],
      },
      {
        title: 'models',
        icon: 'i-vscode-icons-folder-type-model',
        iconOpened: 'i-vscode-icons-folder-type-model-opened',
        children: [
          {
            title: 'user.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
        ],
      },
      {
        title: 'services',
        icon: 'i-vscode-icons-folder-type-services',
        iconOpened: 'i-vscode-icons-folder-type-services-opened',
        children: [],
      },
      {
        title: 'validators',
        children: [
          {
            title: 'create_user_validator.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
        ],
      },
    ],
  },
  {
    title: 'bin',
    icon: 'i-vscode-icons-folder-type-binary',
    iconOpened: 'i-vscode-icons-folder-type-binary-opened',
    children: [
      {
        title: 'console.ts',
        icon: 'i-vscode-icons-file-type-typescript',
      },
      {
        title: 'server.ts',
        icon: 'i-vscode-icons-file-type-typescript',
      },
      {
        title: 'test.ts',
        icon: 'i-vscode-icons-file-type-typescript',
      },
    ],
  },
  {
    title: 'config',
    icon: 'i-vscode-icons-folder-type-config',
    iconOpened: 'i-vscode-icons-folder-type-config-opened',
    children: [
      {
        title: 'app.ts',
        icon: 'i-vscode-icons-file-type-typescript',
      },
      {
        title: 'bodyparser.ts',
        icon: 'i-vscode-icons-file-type-typescript',
      },
      {
        title: 'hash.ts',
        icon: 'i-vscode-icons-file-type-typescript',
      },
      {
        title: 'logger.ts',
        icon: 'i-vscode-icons-file-type-typescript',
      },
      {
        title: 'session.ts',
        icon: 'i-vscode-icons-file-type-typescript',
      },
      {
        title: 'shield.ts',
        icon: 'i-vscode-icons-file-type-typescript',
      },
      {
        title: 'static.ts',
        icon: 'i-vscode-icons-file-type-typescript',
      },
      {
        title: 'vite.ts',
        icon: 'i-vscode-icons-file-type-typescript',
      },
    ],
  },
  {
    title: 'resources',
    children: [
      {
        title: 'css',
        icon: 'i-vscode-icons-folder-type-css',
        iconOpened: 'i-vscode-icons-folder-type-css-opened',
        children: [
          {
            title: 'app.css',
            icon: 'i-vscode-icons-file-type-css',
          },
        ],
      },
      {
        title: 'js',
        icon: 'i-vscode-icons-folder-type-js',
        iconOpened: 'i-vscode-icons-folder-type-js-opened',
        children: [
          {
            title: 'app.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
        ],
      },
      {
        title: 'views',
        icon: 'i-vscode-icons-folder-type-view',
        iconOpened: 'i-vscode-icons-folder-type-view-opened',
        children: [
          {
            title: 'pages',
            icon: 'i-vscode-icons-folder-type-view',
            iconOpened: 'i-vscode-icons-folder-type-view-opened',
            children: [
              {
                title: 'home.edge',
                icon: 'i-vscode-icons-file-type-edge',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'start',
    children: [
      {
        title: 'env.ts',
        icon: 'i-vscode-icons-file-type-typescript',
      },
      {
        title: 'kernel.ts',
        icon: 'i-vscode-icons-file-type-typescript',
      },
      {
        title: 'routes.ts',
        icon: 'i-vscode-icons-file-type-typescript',
      },
    ],
  },
  {
    title: 'tests',
    icon: 'i-vscode-icons-folder-type-test',
    iconOpened: 'i-vscode-icons-folder-type-test-opened',
    children: [
      {
        title: 'bootstrap.ts',
        icon: 'i-vscode-icons-file-type-typescript',
      },
    ],
  },
  {
    title: 'package.json',
    icon: 'i-vscode-icons-file-type-npm',
  },
  {
    title: 'ace.js',
    icon: 'i-vscode-icons-file-type-js',
  },
  {
    title: 'adonisrc.ts',
    icon: 'i-vscode-icons-file-type-typescript',
  },
  {
    title: 'eslint.config.js',
    icon: 'i-vscode-icons-file-type-eslint',
  },
  {
    title: 'tsconfig.json',
    icon: 'i-vscode-icons-file-type-tsconfig',
  },
  {
    title: 'vite.config.ts',
    icon: 'i-vscode-icons-file-type-vite',
  },
]

const defaultExpanded = ['app']
</script>

<template>
  <Tree name="Folder by Type" :items="items" :default-expanded="defaultExpanded" />
</template>
