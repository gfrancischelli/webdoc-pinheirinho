import Storage from './storage';

describe('Storage', () => {
  const GLOBAL_DATA = {
    currentPage: 1,
    results: ['dummy'],
  }

  const storage = new Storage(GLOBAL_DATA);

  it('should load first page from constructor', () => {
    expect(storage.getPage(1)).toEqual(GLOBAL_DATA.results)
  });

})
