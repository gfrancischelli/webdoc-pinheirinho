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
    Object.keys(this.subscribers)
      .forEach(key => this.subscribers[key](data));
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
    const {[type]: data, emit, loadPage} = this;
    let {posts, pagination} = data;
    pagination.next = page + 1

    ! posts[page]
    ? loadPage(page, type).then(emit)
    : posts = posts.slice(0, page + 1) 
      emit({posts, pagination});
  }

  updateState = (data, type) => {
    const {[type]: lists, currentPage} = this;
    lists.pagination = {
      next: data.next - 1,
      previous: data.previous,
      currentPage: data.currentPage,
      pages: data.pages,
    }
    const newPosts = lists.posts.slice(0);
    newPosts[data.currentPage - 1] = data.results;
    lists.posts = newPosts;
  }
  
  loadPage = (page, type) => {
    const store = this;
    const url =
      `/api/${type}?page=${page + 1}`;

    return fetch( url )
      .then( res => res.json() )
      .then( pages => {
        store.updateState(pages, type);
        const {posts, pagination} = store[type];
        return {posts, pagination}
      });
  }

  loadNext = () => this.load(this.posts.next);
}

export default Store;
