import css from '@shikijs/langs/css'
import html from '@shikijs/langs/html'
import http from '@shikijs/langs/http'
import json from '@shikijs/langs/json'
import ts from '@shikijs/langs/typescript'
import vue from '@shikijs/langs/vue'
import githubLight from '@shikijs/themes/github-light'
import { transformerRemoveComments } from '@shikijs/transformers'
import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

const shiki = createHighlighterCoreSync({
  themes: [githubLight],
  langs: [html, css, ts, vue, http, json],
  engine: createJavaScriptRegexEngine(),
})

export function useHighlight() {
  function highlight(code: string, lang: string) {
    return shiki.codeToHtml(code, {
      lang,
      theme: 'github-light',
      includeExplanation: true,
      transformers: [
        transformerRemoveComments(),
      ],
      colorReplacements: {
        '#fff': 'transparent',
      },
    })
  }

  return {
    highlight,
  }
}
