---
layout: doc
title: distinctUntilChanged
category: filtering
description: Filters out consecutive duplicate values, emitting only when the value changes.
signature: distinctUntilChanged<T>(compareFn?: (previous: T, current: T) => boolean): OperatorFunction<T, T>
marble: |
  source:  1----2----2----3----3----1----2----|
  operator: distinctUntilChanged()
  result:  1----2---------3---------1----2----|
example: |
  import { of } from 'rxjs';
  import { distinctUntilChanged } from 'rxjs/operators';
  
  const values$ = of(1, 1, 2, 2, 3, 2, 2, 1);
  
  values$.pipe(
    distinctUntilChanged()
  ).subscribe(value => console.log(value));
  // Output: 1, 2, 3, 2, 1
  
  const objects$ = of(
    { id: 1, name: 'Alice' },
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  );
  
  objects$.pipe(
    distinctUntilChanged((prev, curr) => prev.id === curr.id)
  ).subscribe(obj => console.log(obj));
  // Output: { id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }
useCases:
  - Search input debouncing where duplicate queries should be ignored to avoid redundant API calls
  - Form validation state changes where only actual state transitions trigger UI updates
  - User presence tracking in real-time applications where consecutive identical status values are filtered

---

## Flow Diagram

```mermaid
sequenceDiagram
    participant Source
    participant Operator as distinctUntilChanged
    participant Observer
    
    Source->>Operator: emit 1
    Operator->>Observer: emit 1 (first value)
    Note over Operator: previous = 1
    
    Source->>Operator: emit 1
    Operator->>Operator: compare(1, 1) = true<br/>(duplicate)
    Note over Operator: skip emission
    
    Source->>Operator: emit 2
    Operator->>Observer: emit 2 (changed)
    Note over Operator: previous = 2
    
    Source->>Operator: emit 2
    Operator->>Operator: compare(2, 2) = true<br/>(duplicate)
    Note over Operator: skip emission
    
    Source->>Operator: emit 3
    Operator->>Observer: emit 3 (changed)
    Note over Operator: previous = 3
    
    Source->>Operator: complete
    Operator->>Observer: complete
```
