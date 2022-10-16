// Класс AsyncForm управляет всеми формами приложения, которые не должны быть отправлены с
// перезагрузкой страницы. Вместо этого данные с таких форм собираются и передаются 
// в метод onSubmit для последующей обработки
class AsyncForm {
  
  // Если переданный элемент не существует, необходимо выкинуть ошибку.
  // Сохраняет переданный элемент и регистрирует события через registerEvents()
  constructor(element) {
    if (!element) {
      throw new error('Ошибка - передан пустой элемент для AsyncForm!');
    }
    this.element = element;
    this.registerEvents();
  }

  // Необходимо запретить отправку формы и в момент отправки вызывает метод submit()
  registerEvents() {
    this.element.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submit();
    })
  }

  // Преобразует данные формы в объект вида
  // {
  //  'название поля формы 1': 'значение поля формы 1',
  //  'название поля формы 2': 'значение поля формы 2'
  // }
  getData() {
    const form = this.element.querySelector('.form');
    const formData = new FormData(form); //Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.
    const entries = formData.entries();
    const obj = {};
    
    for (let item of entries) {
      const key = item[0];
      const value = item[1];
      obj.key = value;
    }
    return obj;
  }

  onSubmit(options){

  }

  // Вызывает метод onSubmit и передаёт туда данные, полученные из метода getData()
  submit() {
    this.onSubmit(this.getData());
  }
}