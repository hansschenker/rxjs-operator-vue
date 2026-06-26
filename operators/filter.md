---
layout: doc
title: filter
category: filtering
description: Emits only the values that pass a given predicate function — all others are silently dropped.
signature: "filter<T>(predicate: (value: T, index: number) => boolean): MonoTypeOperatorFunction<T>"
marble: |
  source:  --1----2----3----4----|
  filter(x => x % 2 === 0)
  result:  -------2---------4----|
example: |
  import { from } from 'rxjs'
  import { filter } from 'rxjs/operators'

  from([1, 2, 3, 4, 5]).pipe(
    filter(x => x % 2 === 0)
  ).subscribe(console.log)
  // Output: 2, 4
useCases:
  - Ignore empty or null values from a stream
  - Filter user keystrokes (e.g. only act on Enter key)
  - Gate events by permission or feature flag
---

## Flow Diagram

```mermaid
sequenceDiagram
  participant S as Source
  participant F as filter(x % 2 === 0)
  participant O as Output
  S->>F: emit 1
  Note over F: 1 fails predicate — drop
  S->>F: emit 2
  F->>O: emit 2
  S->>F: emit 3
  Note over F: 3 fails predicate — drop
  S->>F: emit 4
  F->>O: emit 4
```
