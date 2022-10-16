
 // Класс Modal отвечает за управление всплывающими окнами.
 // В первую очередь это открытие или закрытие имеющихся окон
class Modal {
 
  // Устанавливает текущий элемент в свойство element
  // Регистрирует обработчики событий с помощью Modal.registerEvents()
  // Если переданный элемент не существует, необходимо выкинуть ошибку.
  constructor(element){
    if (!element) {
      throw new error('Ошибка - передан пустой элемент для Modal!');
    }
    this.element = element;
    this.registerEvents();
  }

  // При нажатии на элемент с data-dismiss="modal"
  // должен закрыть текущее окно (с помощью метода Modal.onClose)
  registerEvents() {
    const buttons = this.element.querySelectorAll('button');
    for (let button of buttons) {
      if (button.hasAttribute('data-dismiss')) {
        button.onclick = (event) => {
          event.preventDefault();
          this.onClose();
        }
      }
    }
  }

  // Срабатывает после нажатия на элементы, закрывающие окно.
  // Закрывает текущее окно (Modal.close())
  onClose(e) {
    this.close();
  }
  
  // Открывает окно: устанавливает CSS-свойство display со значением «block»
  open() {
    this.element.style.display = 'block';
  }
  
  // Закрывает окно: удаляет CSS-свойство display
  close(){
    this.element.style.display = 'none';
  }
}