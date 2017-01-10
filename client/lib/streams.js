function Stream(subscribe) {

  function map(transform) {
    const input$ = this;
    return Stream(function(output$) {
      input$.subscribe({
        next: x => output$.next(transform(x)),
        error: e => output$.error(e),
        done: () => output$.done(),
      });
    });
  }

  function filter(condition) {
    const input$ = this;
    return Stream(function(output$) {
      input$.subscribe({
        next: x => {
          condition(x) 
            ? observer.next(x)
            : null
        },
        error: e => observer.error(e),
        done: () => observer.done(),
      });
    });
  }

  return {
    subscribe: subscribe,
    filter: filter,
    map: map
  }
}

export default Stream;
