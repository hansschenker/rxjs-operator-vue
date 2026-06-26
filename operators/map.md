---
layout: doc
title: map
category: transformation
description: Applies a projection function to each emitted value and passes the result downstream.
signature: "map<T, R>(project: (value: T, index: number) => R): OperatorFunction<T, R>"
marble: |
  source:  --1----2----3----|
  map(x => x * 2)
  result:  --2----4----6----|
example: |
  import { of } from 'rxjs'
  import { map } from 'rxjs/operators'

  of(1, 2, 3).pipe(
    map(x => x * 2)
  ).subscribe(console.log)
  // Output: 2, 4, 6
useCases:
  - Transform API response shapes before passing to components
  - Extract a nested property from each emitted object
  - Format or normalise values (dates, currencies, strings)
---

## Flow Diagram

```mermaid
sequenceDiagram
  participant S as Source
  participant M as map(x * 2)
  participant O as Output
  S->>M: emit 1
  M->>O: emit 2
  S->>M: emit 2
  M->>O: emit 4
  S->>M: emit 3
  M->>O: emit 6
```
