import Stream from 'lib/streams';

class Store {
  constructor() {
    const self = this;

    this.news = {posts: [], pagination: {}}
    this.timeline = {posts: [], pagination: {}}
    this.galleries = {posts: [], pagination: {}}

    this.subscribers = {};

    this.loadPage(0, 'news')
  }

  emit = (data) => {
    this.subscribers[data.key](data);
  }

  dataStream = (key) => {
    const self = this;
    return Stream( observer => {
      self.subscribe(key, observer.next)
    }); 
  }

  subscribe = (key, fn) => {
    const {subscribers} = this;
    ! subscribers[key] 
    ? subscribers[key] = fn
    : console.warn('Two subscribers must have diferent keys');
  } 

  close = (key) => delete this.subscribers[key];

  request = (page, type) => {
    page = parseInt(page);

    let {posts, pagination} = this[type];
    const {emit, loadPage} = this;

    if (posts[page - 1] && posts[page - 1] != undefined) {
      pagination.currentPage = page;
      pagination.previous = page - 1;
      pagination.next = page >= pagination.totalPages ? false:  page + 1;

      posts = posts[page - 1];

      emit({posts, pagination, key: type});
    } 
    else if ( !page ) {
      console.warn('Request exceeded total pages');
    } else {
      loadPage(page, type).then(emit)
    }
  }

  updateState = (data, type) => {
    const list = this[type];

    const newPosts = list.posts.slice(0);
    newPosts[data.currentPage - 1] = data.results;

    list.posts = newPosts;
    list.pagination = {
      next: data.next ,
      previous: data.previous,
      currentPage: data.currentPage,
      pages: data.pages,
      totalPages: data.totalPages,
    }
  }
  
  loadPage = (page, type) => {
    const store = this;
    const url =
      `/api/${type}?page=${parseInt( page )}`;


    return fetch( url )
      .then( res => res.json() )
      .then( pages => {
        store.updateState(pages, type);
        const {posts, pagination} = store[type];
        const response = {posts: posts[page - 1], pagination, key: type}
        return response;
      });
  }

  loadNext = () => this.load(this.posts.next);
}

export default Store;
