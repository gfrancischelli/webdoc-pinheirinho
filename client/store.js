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
      `/api/${type}${page_query}`;


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
