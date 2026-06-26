import Anthropic from '@anthropic-ai/sdk'
import { writeFileSync, existsSync } from 'fs'

const operatorName = process.argv[2]

if (!operatorName) {
  console.error('Usage: npm run generate <operatorName>')
  console.error('Example: npm run generate switchMap')
  process.exit(1)
}

const outputPath = `operators/${operatorName}.md`
if (existsSync(outputPath)) {
  console.error(`File already exists: ${outputPath}`)
  process.exit(1)
}

console.log(`Generating documentation for "${operatorName}"...`)

const client = new Anthropic()

const response = await client.messages.create({
  model: 'claude-haiku-4-5-20251001',
  max_tokens: 1024,
  messages: [{
    role: 'user',
    content: `Generate VitePress frontmatter + a Mermaid flow diagram for the RxJS operator "${operatorName}".

Return a complete .md file with:
1. YAML frontmatter (between --- delimiters) with these exact fields:
   - layout: doc
   - title: the operator name
   - category: one of transformation|filtering|combination|error|utility
   - description: one clear sentence explaining what it does
   - signature: the TypeScript function signature
   - marble: 3-line ASCII marble diagram (source line, operator line, result line)
   - example: a short runnable TypeScript code snippet (no fenced code block, plain text)
   - useCases: list of exactly 3 real-world use cases

2. After the frontmatter, a "## Flow Diagram" section with a mermaid sequenceDiagram showing how values flow through the operator.

Return nothing except the complete .md file content.`
  }]
})

const content = response.content[0].type === 'text' ? response.content[0].text : ''
writeFileSync(outputPath, content + '\n')
console.log(`Created ${outputPath}`)
console.log(`Add it to .vitepress/config.ts sidebar to make it appear in the docs.`)
