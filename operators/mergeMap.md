---
layout: doc
title: mergeMap
category: transformation
description: Projects each source value to an inner Observable and merges all inner Observables concurrently into a single stream.
signature: "mergeMap<T, R>(project: (value: T, index: number) => ObservableInput<R>): OperatorFunction<T, R>"
marble: |
  source:    --a---------b---------|
  mergeMap(x => interval(1).take(3))
  result:    --a1-a2-a3--b1-b2-b3--|
example: |
  import { fromEvent } from 'rxjs'
  import { mergeMap } from 'rxjs/operators'
  import { ajax } from 'rxjs/ajax'

  fromEvent(button, 'click').pipe(
    mergeMap(() => ajax.getJSON('/api/data'))
  ).subscribe(console.log)
  // Each click triggers a new request; all run concurrently
useCases:
  - Parallel HTTP requests triggered by a stream of events
  - Upload multiple files concurrently
  - Fan-out: one event triggers many independent async tasks
---

## Flow Diagram

```mermaid
sequenceDiagram
  participant S as Source
  participant M as mergeMap
  participant A as Inner A
  participant B as Inner B
  participant O as Output
  S->>M: emit "a"
  M->>A: subscribe to inner A
  A->>O: emit a1
  S->>M: emit "b"
  M->>B: subscribe to inner B (concurrent)
  A->>O: emit a2
  B->>O: emit b1
  A->>O: emit a3
  B->>O: emit b2
```
