import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: 'RxJS Operator Docs',
  description: 'Visual documentation for RxJS operators',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Operators', link: '/operators/map' }
    ],
    sidebar: [
      {
        text: 'Transformation',
        items: [
          { text: 'map', link: '/operators/map' },
          { text: 'mergeMap', link: '/operators/mergeMap' },
          { text: 'switchMap', link: '/operators/switchMap' },
          { text: 'concatMap', link: '/operators/concatMap' }
        ]
      },
      {
        text: 'Filtering',
        items: [
          { text: 'filter', link: '/operators/filter' },
          { text: 'debounceTime', link: '/operators/debounceTime' },
          { text: 'takeUntil', link: '/operators/takeUntil' }
        ]
      },
      {
        text: 'Combination',
        items: [
          { text: 'combineLatest', link: '/operators/combineLatest' },
          { text: 'forkJoin', link: '/operators/forkJoin' }
        ]
      },
      {
        text: 'Error Handling',
        items: [
          { text: 'catchError', link: '/operators/catchError' }
        ]
      }
    ]
  },
  mermaid: { theme: 'neutral' }
}))
