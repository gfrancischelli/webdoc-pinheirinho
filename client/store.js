import Stream from 'lib/streams';

class Store {
  constructor() {
    this.news = {
      posts: ['dumb api starts counting from 1'],
      next: 1,
    }
    this.timeline = {
      posts: ['dumb api starts counting from 1'],
      next: 1,
    }
    this.galleries = {
      posts: ['dumb api starts counting from 1'],
      next: 1,
    }
    this.subscribers = {'update': []};
    this.dataStream = Stream( function(observer) {
      this.subscribe('update', observer.next());
      console.log('dispatch data')
    })
  }

  emit = (data) => {
    const keys = Object.keys(this.subscribers);
    keys.forEach( key => {
      this.subscribers[key].forEach( fn => fn(data) )
    });
  }

  subscribe = (event, fn) => {
    console.log('subscribe: ', event, fn)
    this.subscribers[event] = this
      .subscribers[event]
      .concat(fn);
    console.log(this.subscribers)
  }

  request = (page, type) => {
    console.log('request: ', page, type)
    if (this[type].posts[page]) {
      const page = {
        posts: this[type].posts.slice(0, page + 1),
        next: page + 1,
      }
      this.emit(page);
    } else {
      this.loadPage(page, type)
      .then(this.emit);
    }
  }

  getPage = (page, type) => {
    if(this[type].posts[page]) {
      return Promise.resolve({
        posts: this[type].posts.slice(0, page + 1),
        next: page + 1,
      });
    }
    else {
      return this.loadPage(page, type);
    }
  }

  updateState = (data, type) => {
    this.currentPage = data.currentPage;
    this[type].next = data.next
    this[type].posts = this[type].posts.concat([ data.results ]);
  }
  
  loadPage = (page, type) => {
    const store = this;
    const page_query = `?page=${page ? page : 0}`;
    const url =
      `http://104.236.198.234/api/${type}${page_query}`;

    return fetch( url )
      .then( res => res.json() )
      .then( pages => {
        store.updateState(pages, type);
        return {
          posts: store[type].posts,
          next: store[type].next,
        }
      });
  }

  loadNext = () => this.load(this.posts.next);
}

export default Store;
