/**
 * Класс AccountsWidget управляет блоком отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения списка счетов и последующего отображения
   * Если переданный элемент не существует, необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new error('Ошибка - передан пустой элемент для AccountsWidget!');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.addEventListener('click', (event) => {
      if (event.target.classList.contains('create-account')) {
        App.getModal('createAccount').open();
      }
      if (event.target.classList.contains('account')) {
        AccountsWidget.onSelectAccount(event.target.classList.contains('account'));
      }
    })
  }

  /**
   * Метод доступен только авторизованным пользователям (User.current()).
   * Если пользователь авторизован, необходимо получить список счетов через Account.list(). 
   * При успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью метода renderItem()
   * */
  update() {
    const currentUser = User.current();
    if (currentUser) {
      Account.list(data, (err, response) => {
        if (response.success) {
          this.clear();
          this.renderItem();
        }
      })
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account в боковой колонке
   * */
  clear() {
    const accounts = document.querySelectorAll('ul.accounts-panel > li.account');
    for (let account of accounts) {
      account.remove();
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active. 
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    const accounts = document.querySelectorAll('ul.accounts-panel > li.account');
    accounts.onclick = function (event) {
      for (let account of accounts) {
        account.classList.remove('active');
      }
      element.classList.add('active');
      App.showPage('transactions', { account_id: element.dataset.id });
    }
  }

  /**
   * Возвращает HTML-код счёта для последующего отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    return (
      `<li class="account" data-id=${item.id}>
    <a href="#">
        <span>${item.name}</span> /
        <span>${item.sum} ₽</span>
    </a>
    </li>`)
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data) {
    const accountsPanel = document.querySelector('.accounts-panel');
    accountsPanel.innerHTML = '';
    data.forEach(item => {
      accountsPanel.insertAdjacentHTML('beforeend', this.getAccountHTML(item));
    });
  }
}
