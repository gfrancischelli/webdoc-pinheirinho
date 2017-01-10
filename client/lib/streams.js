function Stream(subscribe) {

  function map(transform) {
    const input$ = this;
    return Stream(function(output$) {
      input$.subscribe({
        next: x => {
          output$.next(transform(x))
        },
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

function map(stream, fn) {
  return Stream()
}

const click$ = Stream(function(observer ) {
  document.addEventListener('click', e => {
    observer.next();
  });
});

const array$ = Stream( function(observer) {
  [10, 20, 30].forEach(item => observer.next(item));
  observer.done();
});

export default Stream;
