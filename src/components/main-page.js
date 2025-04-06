export class MainPage {
  constructor(title, text) {
    this.title = document.createElement("h1");
    this.title.textContent = title;
    this.title.className = "main-page-info";

    this.text = document.createElement("p");
    this.text.textContent = text;
    this.text.className = "main-page-info";

    const mainContainer = document.createElement("div");
    mainContainer.className = "main-container";

    const button = document.createElement("button");
    button.className = "button button-right";
    button.textContent = "Очистить поле";
    button.addEventListener("click", () => {
      mainContainer.innerHTML = "";
    })

    document.body.append(this.title, this.text, mainContainer,button);
  }
}