---
layout: doc
title: takeUntil
category: filtering
description: Emits values from the source Observable until a notifier Observable emits, then completes — the primary tool for preventing memory leaks.
signature: "takeUntil<T>(notifier: ObservableInput<any>): MonoTypeOperatorFunction<T>"
marble: |
  source:   --1--2--3--4--5--|
  notifier: -----------n-----|
  takeUntil(notifier)
  result:   --1--2--3--|
example: |
  import { interval, Subject } from 'rxjs'
  import { takeUntil } from 'rxjs/operators'

  const destroy$ = new Subject<void>()

  interval(1000).pipe(
    takeUntil(destroy$)
  ).subscribe(console.log)

  // In Vue: onUnmounted(() => destroy$.next())
  // Subscription auto-cancels when component unmounts
useCases:
  - Unsubscribe from streams when a Vue/Angular component is destroyed
  - Stop polling when a user navigates away from a page
  - Cancel a long-running operation on user request
---

## Flow Diagram

```mermaid
sequenceDiagram
  participant S as Source interval
  participant T as takeUntil
  participant D as destroy$ Subject
  participant O as Output
  S->>T: emit 0
  T->>O: emit 0
  S->>T: emit 1
  T->>O: emit 1
  D->>T: next() (component unmounts)
  T->>O: complete
```
```
