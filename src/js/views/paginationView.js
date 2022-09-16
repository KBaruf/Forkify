import view from './view.js';
import icons from '../../img/icons.svg';
class PaginationView extends view {
  parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.go;
      handler(goToPage);
    });
  }

  generateMarkup() {
    const numPage = Math.ceil(
      +this._data.results.length / this._data.resultsPerPage
    );
    const pageNumber = this._data.page;

    // on page 1 with other pages
    if (pageNumber === 1 && numPage > 1) {
      return `<button data-go='${
        pageNumber + 1
      }'class="btn--inline pagination__btn--next">
            <span>Page ${pageNumber + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    // on other pages
    if (pageNumber < numPage && numPage > 1) {
      return `
        <button data-go='${
          pageNumber - 1
        }' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${pageNumber - 1}</span>
          </button>
      
        <button data-go='${
          pageNumber + 1
        }' class="btn--inline pagination__btn--next">
            <span>Page ${pageNumber + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    // on the last page
    if (pageNumber === numPage && numPage !== 1) {
      return `<button data-go='${
        pageNumber - 1
      }'class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${numPage}</span>
      </button>`;
    }
    // only one page & no other pages
    return '';
  }
}
export default new PaginationView();
