// Класс Sidebar отвечает за работу боковой колонки:
// кнопки скрытия/показа колонки в мобильной версии сайта и за кнопки меню
class Sidebar {
  
  // Запускает initAuthLinks и initToggleButton
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  // Отвечает за скрытие/показа боковой колонки:
  // переключает два класса для body: sidebar-open и sidebar-collapse
  // при нажатии на кнопку .sidebar-toggle
  static initToggleButton() {
    const body = document.querySelector('.sidebar-mini');
    const sidebarToggle = document.querySelector('.sidebar-toggle');

    sidebarToggle.addEventListener('click', () => {
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    })
  }

  // При нажатии на кнопку входа, показывает окно входа (через найденное в App.getModal)
  // При нажатии на кнопку регастрации показывает окно регистрации
  // При нажатии на кнопку выхода вызывает User.logout и по успешному выходу устанавливает App.setState( 'init' )
  static initAuthLinks() {
    const registerLink = document.querySelector('.menu-item_register').firstElementChild;
    registerLink.addEventListener('click', (event) => {
      event.preventDefault();
      App.getModal('register').open();
    })

    const loginLink = document.querySelector('.menu-item_login').firstElementChild;
    loginLink.addEventListener('click', (event) => {
      event.preventDefault();
      App.getModal('login').open();
    })

    const logoutLink = document.querySelector('.menu-item_logout').firstElementChild;
    logoutLink.addEventListener('click', (event) => {
      event.preventDefault();
      User.logout((err, response) => {
        if (response.success) {
          App.setState('init');
        }
      })
    })
  }
}