class Store {
  constructor() {
    this.next = 0;
    this.posts = ['dumb api starts counting from 1'];
  }

  getPage = (page) => {
    if(this.posts[page]) {
      return Promise.resolve({
        posts: this.posts.slice(0, page + 1),
        next: page + 1,
      });
    }
    else {
      return this.loadPage(page);
    }
  }

  updateState = (data) => {
    this.currentPage = data.currentPage;
    this.next = data.next
    this.posts = this.posts.concat([ data.results ]);
  }
  
  loadPage = (page) => {
    const store = this;
    const page_query = `?page=${page ? page : 0}`;
    const url =
      `http://104.236.198.234/api/timeline${page_query}`;


    return fetch( url )
      .then( res => res.json() )
      .then( pages => {
        store.updateState(pages);
        return {
          posts: store.posts,
          next: store.next,
        }
      });
  }

  loadNext = () => this.load(this.posts.next);
}

export default Store;
