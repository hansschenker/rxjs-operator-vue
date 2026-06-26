---
layout: doc
title: concatMap
category: transformation
description: Projects each source value to an inner Observable and concatenates them in order, waiting for each to complete before subscribing to the next.
signature: "concatMap<T, R>(project: (value: T, index: number) => ObservableInput<R>): OperatorFunction<T, R>"
marble: |
  source:  --a-----b-----c----|
  concatMap(x => timer(2))
  result:  --a1----b1----c1--|
  (strictly sequential, no overlap)
example: |
  import { from } from 'rxjs'
  import { concatMap } from 'rxjs/operators'
  import { ajax } from 'rxjs/ajax'

  from(['step1', 'step2', 'step3']).pipe(
    concatMap(step => ajax.post(`/api/${step}`))
  ).subscribe(console.log)
  // Each step runs only after the previous one completes
useCases:
  - Sequential API calls where order matters (wizard steps, checkout flow)
  - Animate items one after another
  - Process a queue of tasks without overlap
---

## Flow Diagram

```mermaid
sequenceDiagram
  participant S as Source
  participant C as concatMap
  participant A as async task
  S->>C: value "a"
  C->>A: start task A
  A->>C: complete A
  S->>C: value "b"
  C->>A: start task B
  A->>C: complete B
```
```
