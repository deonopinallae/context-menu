import { Module } from "../core/module";

export class GameCrossModule extends Module {
  constructor() {
    super("gamecross", "Крестики-нолики");
    this.state = 0;
    this.square = [2, 2, 2, 2, 2, 2, 2, 2, 2];
    this.winner = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    this.gameOver = false;
    this.winningLine = null;
  }

  checkWinner() {
    for (const line of this.winner) {
      if (
        this.square[line[0]] === 0 &&
        this.square[line[1]] === 0 &&
        this.square[line[2]] === 0
      ) {
        this.winningLine = line;
        return "cross";
      }
      if (
        this.square[line[0]] === 1 &&
        this.square[line[1]] === 1 &&
        this.square[line[2]] === 1
      ) {
        this.winningLine = line;
        return "zero";
      }
    }
    return false;
  }
  drawWinningLine() {
    if (!this.winningLine) return;

    const container = document.querySelector(".gamecross-container");
    const cells = container.querySelectorAll(".gamecross-cell");

    // Получаем координаты ячеек
    const coords = this.winningLine.map((index) => {
      const rect = cells[index].getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      };
    });

    // Создаем элемент линии
    const line = document.createElement("div");
    line.className = "winning-line";
    container.appendChild(line);

    // Определяем параметры линии
    const x1 = coords[0].x;
    const y1 = coords[0].y;
    const x2 = coords[2].x;
    const y2 = coords[2].y;

    // Рассчитываем длину и угол наклона
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

    // Устанавливаем стили линии
    line.style.width = `${length}px`;
    line.style.height = "8px";
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.transformOrigin = "0 0";
    line.style.transform = `rotate(${angle}deg)`;
    line.style.background = "rgba(255, 215, 0, 0.7)";
    line.style.boxShadow = "0 0 10px 2px rgba(255, 215, 0, 0.8)";

    // Анимация появления
    setTimeout(() => {
      line.style.opacity = "1";
      line.style.transition = "opacity 0.5s ease-out";
    }, 10);
  }

  resetGame() {
    this.state = 0;
    this.square = [2, 2, 2, 2, 2, 2, 2, 2, 2];
    this.gameOver = false;
    this.winningLine = null;
    document.querySelector(".gamecross-container").remove();
  }

  trigger() {
    if (document.querySelector(".gamecross-container")) {
      this.resetGame();
    }

    const container = document.createElement("div");
    container.className = "gamecross-container";

    for (let index = 0; index < 9; index++) {
      const square = document.createElement("div");
      square.dataset.id = `${index}`;
      square.className = "gamecross-cell";
      container.append(square);
    }

    container.addEventListener("click", (event) => {
      if (this.gameOver) return;
      const square = event.target;
      const id = square.dataset.id;

      if (square.classList.contains("gamecross-cell")) {
        if (this.state === 0) {
          if (
            square.classList.contains("gamecross-cell-cross") ||
            square.classList.contains("gamecross-cell-zero")
          )
            return;
          this.square[id] = this.state;
          square.classList.add("gamecross-cell-cross");
        }

        if (this.state === 1) {
          if (
            square.classList.contains("gamecross-cell-cross") ||
            square.classList.contains("gamecross-cell-zero")
          )
            return;
          this.square[id] = this.state;
          square.classList.add("gamecross-cell-zero");
        }
        const winner = this.checkWinner();
        if (winner) {
          this.gameOver = true;
          this.drawWinningLine();
          container.classList.add("locked-div");
          setTimeout(() => {
            alert(`Победили ${winner === "cross" ? "крестики" : "нолики"}!`);
          }, 500);
        }
        this.state = +!this.state;
      }
    });

    document.body.appendChild(container);
  }
}
