import { Menu } from "../core/menu";
import { Module } from "../core/module";

export class ContextMenu extends Menu {
  constructor(selector) {
    super(selector);
    this.modules = []; // Хранилище модулей

    // Открытие по правому клику
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      this.open(e.clientX, e.clientY);
    });

    // Обработка кликов по пунктам
    this.el.addEventListener("click", (e) => {
      const menuItem = e.target.closest("[data-type]");
      if (menuItem) {
        const module = this.modules.find(
          (m) => m.type === menuItem.dataset.type
        );
        module?.trigger();
        this.close();
      }
    });
  }

  open(x, y) {
    // Проверка границ экрана
    this.el.style.display = "block";
    const { offsetWidth, offsetHeight } = this.el;
    this.el.style.left = `${Math.min(x, window.innerWidth - offsetWidth)}px`;
    this.el.style.top = `${Math.min(y, window.innerHeight - offsetHeight)}px`;
  }

  close() {
    this.el.style.display = "none";
  }

  // Переопределяем add() для работы только с модулями
  add(module) {
    if (!(module instanceof Module)) {
      throw new Error("Ошибка, необходимо использовать module");
    }
    this.modules.push(module);
    this.el.insertAdjacentHTML("beforeend", module.toHTML());
  }
}
