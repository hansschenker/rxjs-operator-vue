<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
const { frontmatter } = useData()

const categoryColors: Record<string, string> = {
  transformation: '#3b82f6',
  filtering:      '#10b981',
  combination:    '#8b5cf6',
  error:          '#ef4444',
  utility:        '#f59e0b'
}

const color = categoryColors[frontmatter.value.category] ?? '#6b7280'
</script>

<template>
  <Layout>
    <template #doc-before>
      <div v-if="frontmatter.category" class="operator-doc">

        <!-- Header -->
        <div class="op-header">
          <span class="op-category" :style="{ backgroundColor: color }">
            {{ frontmatter.category }}
          </span>
          <h1 class="op-title">{{ frontmatter.title }}</h1>
          <p class="op-description">{{ frontmatter.description }}</p>
        </div>

        <!-- Signature -->
        <div class="op-section">
          <h2>Signature</h2>
          <pre class="op-signature"><code>{{ frontmatter.signature }}</code></pre>
        </div>

        <!-- Marble Diagram -->
        <div class="op-section">
          <h2>Marble Diagram</h2>
          <pre class="op-marble"><code>{{ frontmatter.marble }}</code></pre>
        </div>

        <!-- Code Example -->
        <div class="op-section">
          <h2>Example</h2>
          <pre class="op-code"><code>{{ frontmatter.example }}</code></pre>
        </div>

        <!-- Use Cases -->
        <div v-if="frontmatter.useCases" class="op-section">
          <h2>Common Use Cases</h2>
          <ul class="op-usecases">
            <li v-for="uc in frontmatter.useCases" :key="uc">{{ uc }}</li>
          </ul>
        </div>

        <hr class="op-divider" />
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.operator-doc { max-width: 800px; margin-bottom: 2rem; }

.op-header    { margin-bottom: 2rem; }
.op-category  { display: inline-block; padding: 2px 10px; border-radius: 12px;
                color: white; font-size: 0.75rem; font-weight: 600;
                text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
.op-title     { font-size: 2rem; font-weight: 700; margin: 0.25rem 0; }
.op-description { font-size: 1.1rem; color: var(--vp-c-text-2); margin: 0; }

.op-section   { margin-bottom: 2rem; }
.op-section h2 { font-size: 1rem; font-weight: 600; text-transform: uppercase;
                  letter-spacing: 0.05em; color: var(--vp-c-text-2); margin-bottom: 0.75rem; }

.op-signature { background: var(--vp-code-block-bg); padding: 1rem;
                border-radius: 8px; overflow-x: auto; font-size: 0.9rem; }
.op-marble    { background: var(--vp-code-block-bg); padding: 1rem;
                border-radius: 8px; font-family: monospace; font-size: 0.95rem;
                line-height: 1.8; white-space: pre; }
.op-code      { background: var(--vp-code-block-bg); padding: 1rem;
                border-radius: 8px; overflow-x: auto; font-size: 0.9rem; }
.op-mermaid   { background: var(--vp-c-bg-soft); padding: 1.5rem;
                border-radius: 8px; text-align: center; }

.op-usecases  { padding-left: 1.25rem; }
.op-usecases li { margin-bottom: 0.4rem; color: var(--vp-c-text-1); }

.op-divider   { border: none; border-top: 1px solid var(--vp-c-divider); margin: 2rem 0; }
</style>
