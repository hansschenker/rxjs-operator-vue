---
layout: doc
title: catchError
category: error
description: Catches errors from the source Observable and handles them by returning a new Observable or re-throwing — keeps the stream alive after an error.
signature: "catchError<T, O extends ObservableInput<any>>(selector: (err: any, caught: Observable<T>) => O): OperatorFunction<T, T | ObservedValueOf<O>>"
marble: |
  source:  --1--2--X
  catchError(() => of(0))
  result:  --1--2--0|
  (error replaced with fallback value)
example: |
  import { of } from 'rxjs'
  import { catchError, retry } from 'rxjs/operators'
  import { ajax } from 'rxjs/ajax'

  ajax.getJSON('/api/data').pipe(
    retry(2),
    catchError(err => {
      console.error('Failed after 2 retries', err)
      return of({ data: [], error: true })
    })
  ).subscribe(response => render(response))
useCases:
  - Return a fallback value when an HTTP request fails
  - Show a user-friendly error state instead of crashing the stream
  - Log errors and switch to a cached or default data source
---

## Flow Diagram

```mermaid
sequenceDiagram
  participant S as Source
  participant C as catchError
  participant F as Fallback of([])
  participant O as Output
  S->>C: emit 1
  C->>O: emit 1
  S->>C: error!
  C->>F: invoke selector
  F->>O: emit []
  F->>O: complete
```
```
