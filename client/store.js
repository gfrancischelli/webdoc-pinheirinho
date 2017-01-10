import Stream from 'lib/streams';
const concatArray = (arr, el) => arr.concat(el);

class Store {
  constructor() {
    const self = this;

    this.news = {posts: []}
    this.timeline = {posts: []}
    this.galleries = {posts: []}

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
    let {posts} = data;

    ! posts[page]
    ? loadPage(page, type).then(emit)
    : posts = posts.slice(0, page + 1) 
      emit({posts, next: page + 1 });
  }

  updateState = (data, type) => {
    const {[type]: lists, currentPage} = this;
    lists.next = data.next - 1;
    lists.posts = lists.posts.concat([ data.results ]);
  }
  
  loadPage = (page, type) => {
    const store = this;
    const url =
      `http://104.236.198.234/api/${type}?page=${page + 1}`;

    return fetch( url )
      .then( res => res.json() )
      .then( pages => {
        store.updateState(pages, type);
        const {posts, next} = store[type];
        return {posts, next}
      });
  }

  loadNext = () => this.load(this.posts.next);
}

export default Store;
