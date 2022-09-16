import icons from '../../img/icons.svg';
export default class view {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.errorMessageHandler();
    this._data = data;
    const markup = this.generateMarkup();
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  clear() {
    this.parentElement.innerHTML = '';
  }
  spinner() {
    // spinner
    const markup = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  errorMessageHandler(message = this.errorMessage) {
    const markup = `<div class="error">
                    <div>
                      <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                      </svg>
                    </div>
                    <p>${message}</p>
                  </div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  errorMessageStarterHandler(message = this.errorMessage) {
    const markup = `<div class="error">
                    <div>
                      <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                      </svg>
                    </div>
                    <p>${message}</p>
                  </div>`;

    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  successMessageHandler(message = this.successMessage) {
    const markup = `<div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
