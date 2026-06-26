---
layout: doc
title: switchMap
category: transformation
description: Projects each source value to an inner Observable, cancelling any previously active inner Observable when a new source value arrives.
signature: "switchMap<T, R>(project: (value: T, index: number) => ObservableInput<R>): OperatorFunction<T, R>"
marble: |
  source:  --a---------b---------|
  switchMap(x => interval(1).take(3))
  result:  --a1-a2-(b1)-b2-b3---|
  (a3 cancelled when b arrives)
example: |
  import { fromEvent } from 'rxjs'
  import { switchMap, debounceTime } from 'rxjs/operators'
  import { ajax } from 'rxjs/ajax'

  fromEvent(input, 'input').pipe(
    debounceTime(300),
    switchMap(e => ajax.getJSON(`/api/search?q=${e.target.value}`))
  ).subscribe(results => render(results))
  // Previous request is cancelled when user types again
useCases:
  - Live search — cancel previous request when user types a new character
  - Route changes — cancel pending navigation request on new route change
  - Real-time data refresh — always use only the latest request result
---

## Flow Diagram

```mermaid
sequenceDiagram
  participant U as User Input
  participant S as switchMap
  participant A as HTTP Request
  U->>S: type "re"
  S->>A: GET /search?q=re
  U->>S: type "rea"
  S-->>A: cancel previous
  S->>A: GET /search?q=rea
  A->>S: results
```
```
