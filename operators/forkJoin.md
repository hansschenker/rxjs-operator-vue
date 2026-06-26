---
layout: doc
title: forkJoin
category: combination
description: Waits for all provided Observables to complete, then emits an array of their last values — like Promise.all() for Observables.
signature: "forkJoin<T extends readonly unknown[]>(sources: [...ObservableInputTuple<T>]): Observable<T>"
marble: |
  a$:     --1--2--3|
  b$:     ----A--B|
  forkJoin([a$, b$])
  result: --------[3, B]|
  (emits only when ALL complete)
example: |
  import { forkJoin } from 'rxjs'
  import { ajax } from 'rxjs/ajax'

  forkJoin({
    user:    ajax.getJSON('/api/user/1'),
    posts:   ajax.getJSON('/api/posts?userId=1'),
    friends: ajax.getJSON('/api/friends?userId=1')
  }).subscribe(({ user, posts, friends }) => {
    renderProfile(user, posts, friends)
  })
useCases:
  - Load all data needed for a page in parallel before rendering
  - Run multiple independent API calls and wait for all to finish
  - Batch operations where you need every result before proceeding
---

## Flow Diagram

```mermaid
sequenceDiagram
  participant A as Request A
  participant F as forkJoin
  participant B as Request B
  participant O as Output
  A->>F: running...
  B->>F: running...
  A->>F: complete (last: 3)
  B->>F: complete (last: B)
  F->>O: [3, B]
```
```
