import { Menu } from "./core/menu";
import { Module } from "./core/module";

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
    const { offsetWidth, offsetHeight } = this.el;
    this.el.style.left = `${Math.min(x, window.innerWidth - offsetWidth)}px`;
    this.el.style.top = `${Math.min(y, window.innerHeight - offsetHeight)}px`;
    this.el.classList.toggle("open", true); // в css уже прописан класс для показа/удаления меню
  }

  close() {
    this.el.classList.toggle("open", false);
  }

  // Переопределяем add() для работы только с модулями
  add(module) {
    if (!(module instanceof Module)) {
      throw new Error("Only Module instances can be added to ContextMenu");
    }
    this.modules.push(module);
    this.el.insertAdjacentHTML("beforeend", module.toHTML());
  }
}
