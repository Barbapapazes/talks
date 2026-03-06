import html from '@shikijs/langs/html'
import ts from '@shikijs/langs/typescript'
import githubLight from '@shikijs/themes/github-light'
import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

const shiki = createHighlighterCoreSync({
  themes: [githubLight],
  langs: [html, ts],
  engine: createJavaScriptRegexEngine(),
})

export function useHighlight() {
  function highlight(code: string, lang: string) {
    return shiki.codeToHtml(code, {
      lang,
      theme: 'github-light',
    })
  }

  return {
    highlight,
  }
}
