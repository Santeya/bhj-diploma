// Класс CreateTransactionForm управляет формой создания новой транзакции
class CreateTransactionForm extends AsyncForm {

  // Вызывает родительский конструктор и метод renderAccountsList
    constructor(element) {
      super(element)
      this.renderAccountsList();
  }

  // Получает список счетов с помощью Account.list
  // Обновляет в форме всплывающего окна выпадающий список
  renderAccountsList() {
    const accountsSelect = document.querySelector('.accounts-select');
    Account.list(data, (err, response) => {
      if (response.success) {
        
      }
    })

  }

  // Создаёт новую транзакцию (доход или расход) с помощью Transaction.create. По успешному результату
  // вызывает App.update(), сбрасывает форму и закрывает окно, в котором находится форма
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        App.getModal('newIncome').reset();
        App.getModal('newIncome').close();
        App.getModal('newExpense').reset();
        App.getModal('newExpense').close();
        App.update();
      }
    })
  }
}