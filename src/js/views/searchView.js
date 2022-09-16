class searchView {
  parentElement = document.querySelector('.search');
  parentSearch = document.querySelector('.search-results');
  getQuery() {
    const query = this.parentElement.querySelector('.search__field').value;
    this.clearQuery();
    return query;
  }
  clearQuery() {
    this.parentElement.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    this.parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new searchView();
