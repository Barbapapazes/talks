<template>
  <ThemeRoot class="h-full grid place-items-center slidev-layout center">
    <BackgroundImage :img="$frontmatter.img" :img-class="$frontmatter.imgClass" class="-z-1" />

    <div class="relative w-full h-full grid place-items-center">
      <slot />
    </div>
  </ThemeRoot>
</template>
