---
layout: doc
title: scan
category: transformation
description: Applies an accumulator function over the source Observable, emitting each accumulated value, useful for building up state over time.
signature: scan<T, R>(accumulator: (acc: R, value: T, index: number) => R, seed?: R): OperatorFunction<T, R>
marble: |
  source:  --1-----2-----3-----4--|
  scan:    --1-----3-----6-----10-|
  result:  (acc=0) (1)   (1+2)  (3+3) (6+4)
example: |
  import { of } from 'rxjs';
  import { scan } from 'rxjs/operators';

  of(1, 2, 3, 4).pipe(
    scan((acc, value) => acc + value, 0)
  ).subscribe(console.log);
  // Output: 1, 3, 6, 10
useCases:
  - Building running totals and cumulative calculations like sum, product, or moving averages
  - Maintaining application state that evolves with each new event or action dispatch
  - Tracking counters, metrics, or aggregated data from streams of events over time
---

# scan

The `scan` operator applies an accumulator function to each value from the source Observable, storing intermediate results and emitting each accumulated value. It's similar to `reduce` but emits every intermediate accumulation rather than just the final result.

## Flow Diagram

```mermaid
sequenceDiagram
    participant Source as Source Observable
    participant Scan as scan Operator
    participant Observer as Observer

    Source->>Scan: emit value 1
    Note over Scan: acc = 0 + 1 = 1
    Scan->>Observer: emit 1

    Source->>Scan: emit value 2
    Note over Scan: acc = 1 + 2 = 3
    Scan->>Observer: emit 3

    Source->>Scan: emit value 3
    Note over Scan: acc = 3 + 3 = 6
    Scan->>Observer: emit 6

    Source->>Scan: emit value 4
    Note over Scan: acc = 6 + 4 = 10
    Scan->>Observer: emit 10

    Source->>Scan: complete
    Scan->>Observer: complete
```
