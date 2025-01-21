<script lang="ts" setup>
const items = [
  {
    title: 'src',
    icon: 'i-vscode-icons-folder-type-src',
    iconOpened: 'i-vscode-icons-folder-type-src-opened',
    children: [
      {
        id: 'core',
        title: 'core',
        children: [
          {
            id: 'core-users',
            title: 'users',
            children: [
              {
                id: 'users-models',
                title: 'models',
                icon: 'i-vscode-icons-folder-type-model',
                iconOpened: 'i-vscode-icons-folder-type-model-opened',
                children: [
                  {
                    id: 'users-user-model',
                    title: 'user.ts',
                    icon: 'i-vscode-icons-file-type-typescript',
                  },
                ],
              },
              {
                id: 'users-enums',
                title: 'enums',
                children: [
                  {
                    id: 'users-roles-enum',
                    title: 'roles.ts',
                    icon: 'i-vscode-icons-file-type-typescript',
                  },
                ],
              },
              {
                id: 'users-exceptions',
                title: 'exceptions',
                children: [
                  {
                    id: 'users-app-exceptions',
                    title: 'app_exceptions.ts',
                    icon: 'i-vscode-icons-file-type-typescript',
                  },
                ],
              },
            ],
          },
          {
            id: 'core-posts',
            title: 'posts',
            children: [
              {
                id: 'posts-models',
                title: 'models',
                icon: 'i-vscode-icons-folder-type-model',
                iconOpened: 'i-vscode-icons-folder-type-model-opened',
                children: [
                  {
                    id: 'posts-post-model',
                    title: 'post.ts',
                    icon: 'i-vscode-icons-file-type-typescript',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'application',
        title: 'application',
        children: [
          {
            id: 'application-users',
            title: 'users',
            children: [
              {
                id: 'users-services',
                title: 'services',
                icon: 'i-vscode-icons-folder-type-services',
                iconOpened: 'i-vscode-icons-folder-type-services-opened',
                children: [],
              },
              {
                id: 'users-validators',
                title: 'validators',
                children: [
                  {
                    id: 'users-create-user-validator',
                    title: 'create_user_validator.ts',
                    icon: 'i-vscode-icons-file-type-typescript',
                  },
                ],
              },
            ],
          },
          {
            id: 'application-posts',
            title: 'posts',
            children: [
              {
                id: 'posts-services',
                title: 'services',
                icon: 'i-vscode-icons-folder-type-services',
                iconOpened: 'i-vscode-icons-folder-type-services-opened',
                children: [],
              },
              {
                id: 'posts-validators',
                title: 'validators',
                children: [
                  {
                    id: 'posts-create-post-validator',
                    title: 'create_post_validator.ts',
                    icon: 'i-vscode-icons-file-type-typescript',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'infrastructure',
        title: 'infrastructure',
        children: [
          {
            id: 'infrastructure-users',
            title: 'users',
            children: [
              {
                id: 'users-controllers',
                title: 'controllers',
                icon: 'i-vscode-icons-folder-type-controller',
                iconOpened: 'i-vscode-icons-folder-type-controller-opened',
                children: [
                  {
                    id: 'users-auth-controller',
                    title: 'auth_controller.ts',
                    icon: 'i-vscode-icons-file-type-typescript',
                  },
                  {
                    id: 'users-users-controller',
                    title: 'users_controllers.ts',
                    icon: 'i-vscode-icons-file-type-typescript',
                  },
                ],
              },
              {
                id: 'users-events',
                title: 'events',
                icon: 'i-vscode-icons-folder-type-notification',
                iconOpened: 'i-vscode-icons-folder-type-notification-opened',
                children: [
                  {
                    id: 'users-user-created-event',
                    title: 'user_created.ts',
                    icon: 'i-vscode-icons-file-type-typescript',
                  },
                ],
              },
              {
                id: 'users-listeners',
                title: 'listeners',
                children: [
                  {
                    id: 'users-user-created-listener',
                    title: 'user_created_listener.ts',
                    icon: 'i-vscode-icons-file-type-typescript',
                  },
                ],
              },
              {
                id: 'users-middleware',
                title: 'middleware',
                icon: 'i-vscode-icons-folder-type-middleware',
                iconOpened: 'i-vscode-icons-folder-type-middleware-opened',
                children: [],
              },
            ],
          },
          {
            id: 'infrastructure-posts',
            title: 'posts',
            children: [
              {
                id: 'posts-controllers',
                title: 'controllers',
                icon: 'i-vscode-icons-folder-type-controller',
                iconOpened: 'i-vscode-icons-folder-type-controller-opened',
                children: [
                  {
                    id: 'posts-posts-controller',
                    title: 'posts_controller.ts',
                    icon: 'i-vscode-icons-file-type-typescript',
                  },
                ],
              },
            ],
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

const defaultExpanded = ['src']
</script>

<template>
  <Tree name="Hexagonal Architecture" :items="items" :default-expanded="defaultExpanded" />
</template>
