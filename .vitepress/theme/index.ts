import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { MermaidPlugin } from 'vitepress-plugin-mermaid'
import OperatorLayout from './OperatorLayout.vue'

export default {
  extends: DefaultTheme,
  Layout: () => h(OperatorLayout),
  enhanceApp({ app }) {
    app.use(MermaidPlugin)
  }
}
