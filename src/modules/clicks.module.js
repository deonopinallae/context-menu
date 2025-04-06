import { Module } from '../core/module'

export class ClicksModule extends Module {
    constructor() {
        super('clicks', 'Игра: Кликер')
    }

    trigger() {
        const container = document.createElement('div');
        container.id = 'game-container';
        document.body.append(container)
        const mainContainer = document.querySelector(".main-container");
        mainContainer.append(container);

        container.innerHTML = `
            <div class="game-settings">
                <label>
                    Время игры (сек):
                    <input class="fancy-input" type="number" id="game-time" min="10" max="60" value="10">
                </label>
                <label>
                    Уровень сложности:
                    <select class="fancy-select" id="difficulty">
                        <option value="easy">Лёгкий</option>
                        <option value="hard">Сложный</option>
                        <option value="veryhard">Очень сложный</option>
                    </select>
                </label>
                <button class='button' id="start-button">Старт</button>
            </div>

            <div class="game-info">
                <p>Осталось времени: <span id="time">0</span> сек</p>
                <p>Счёт: <span id="score">0</span></p>
            </div>

            <div class="game-area" id="game-area"></div>
        `;

        const startButton = document.getElementById('start-button');
        const gameArea = document.getElementById('game-area');
        const scoreDisplay = document.getElementById('score');
        const timeDisplay = document.getElementById('time');
        const gameTimeInput = document.getElementById('game-time');
        const difficultySelect = document.getElementById('difficulty');

        const difficulties = {
            easy: 50,
            hard: 16,
            veryhard: 2,
        };

        let gameState = {
            score: 0,
            timeLeft: 0,
            circleSize: difficulties.easy,
            circle: null,
            timerStarted: false,
            intervalId: null,
        };

        startButton.addEventListener('click', startGame);

        function startGame() {
            resetGame();
            updateDisplay();

            gameState.timeLeft = +gameTimeInput.value || 10;
        }

        function resetGame() {
            gameState.score = 0;
            gameState.circleSize = difficulties[difficultySelect.value];
            gameState.circle = null;
            gameState.timerStarted = false;
            clearGame();
            generateCircle();
        }

        function updateDisplay() {
            scoreDisplay.textContent = gameState.score;
            timeDisplay.textContent = gameState.timeLeft;
        }

        function generateCircle() {
            gameState.circle = document.createElement('div');
            gameState.circle.classList.add(getCircleClass(gameState.circleSize));
            gameState.circle.addEventListener('click', handleCircleClick);
            gameArea.appendChild(gameState.circle);
            moveCircleRandomly();
        }

        function getCircleClass(size) {
            if (size === difficulties.easy) return 'large-circle';
            if (size === difficulties.hard) return 'medium-circle';
            return 'small-circle';
        }

        function handleCircleClick() {
            gameState.score++;
            updateDisplay();

            if (!gameState.timerStarted) {
                gameState.timerStarted = true;
                startTimer();
            }

            moveCircleRandomly();
        }

        function startTimer() {
            gameState.intervalId = setInterval(() => {
                gameState.timeLeft--;
                updateDisplay();

                if (gameState.timeLeft <= 0) {
                    clearInterval(gameState.intervalId);
                    endGame();
                }
            }, 1000);
        }

        function moveCircleRandomly() {
            const maxX = gameArea.clientWidth - gameState.circleSize;
            const maxY = gameArea.clientHeight - gameState.circleSize;

            const x = Math.floor(Math.random() * maxX);
            const y = Math.floor(Math.random() * maxY);

            gameState.circle.style.left = `${x}px`;
            gameState.circle.style.top = `${y}px`;
        }

        function endGame() {
            alert(`Игра закончена! Ваш счёт: ${gameState.score}`);
            clearGame();
        }

        function clearGame() {
            gameArea.innerHTML = '';
            scoreDisplay.textContent = 0;
            timeDisplay.textContent = 0;
            gameState.circle = null;
            if (gameState.intervalId) {
                clearInterval(gameState.intervalId);
            }
        }
    }
}
