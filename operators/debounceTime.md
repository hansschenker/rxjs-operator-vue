---
layout: doc
title: debounceTime
category: filtering
description: Emits a value from the source only after a specified silence period has passed with no new emissions — drops all intermediate values.
signature: "debounceTime<T>(dueTime: number, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>"
marble: |
  source:  --a-b-c-------d--|
  debounceTime(2)
  result:  ----------c-------d--|
  (only emits after 2ms of silence)
example: |
  import { fromEvent } from 'rxjs'
  import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'

  fromEvent(searchInput, 'input').pipe(
    map(e => e.target.value),
    debounceTime(300),
    distinctUntilChanged()
  ).subscribe(value => searchAPI(value))
  // Only fires 300ms after user stops typing
useCases:
  - Delay search API calls until user stops typing
  - Prevent rapid button-click spam from triggering multiple requests
  - Throttle window resize or scroll event handlers
---

## Flow Diagram

```mermaid
sequenceDiagram
  participant U as User Typing
  participant D as debounceTime(300ms)
  participant A as API Call
  U->>D: keypress "r"
  U->>D: keypress "e"
  U->>D: keypress "a"
  Note over D: 300ms silence...
  D->>A: emit "rea"
```
```
