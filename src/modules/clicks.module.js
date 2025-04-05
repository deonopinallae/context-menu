import { Module } from '../core/module'

export class ClicksModule extends Module {
    constructor() {
        super('clicks', 'Игра: Кликер')
    }

    trigger() {
        const gameWindow = window.open("", "_blank");
        const html = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Игра: Кликер</title>
            <style>
                * {
                    padding: 0; margin: 0; box-sizing: border-box;
                }
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f5f5f5;
                    text-align: center;
                    margin: 20px;
                }
                .game-settings, .game-info {
                    margin-bottom: 20px;
                }
                .game-settings select, .game-settings input {
                    padding: 8px;
                    font-size: 16px;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                    margin: 5px;
                    width: 120px;
                }
                .game-info p {
                    font-size: 18px;
                    font-weight: bold;
                    color: #172070;
                }
                .game-area {
                    width: 600px;
                    height: 400px;
                    border: 1px solid #172070;
                    border-radius: 20px;
                    margin: 0 auto;
                    position: relative;
                    background: #d1d4e2;
                }
                .large-circle {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: crimson;
                    position: absolute;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .medium-circle {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background-color: crimson;
                    position: absolute;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .small-circle {
                    width: 2px;
                    height: 2px;
                    border-radius: 50%;
                    background-color: crimson;
                    position: absolute;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                button {
                    padding: 12px 20px;
                    font-size: 18px;
                    background-color: #172070;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                button:hover {
                    background-color: #5a5a9e;
                }
                #time {
                    font-size: 20px;
                    font-weight: bold;
                    color: #333;
                }
                @media (max-width: 640px) {
                .game-area {
                    width: 100%;
                    height: 300px;
                }
                .game-settings input, .game-settings select, button {
                    font-size: 14px;
                    padding: 6px;
                }
            }
            </style>
        </head>
        <body>
            <div class="game-settings">
                <label>
                    Время игры (сек):
                    <input type="number" id="game-time" min="10" max="60" value="10">
                </label>
                <label>
                    Уровень сложности:
                    <select id="difficulty">
                        <option value="easy">Лёгкий</option>
                        <option value="hard">Сложный</option>
                        <option value="veryhard">Очень сложный</option>
                    </select>
                </label>
                <button id="start-button">Старт</button>
            </div>

            <div class="game-info">
                <p>Осталось времени: <span id="time">0</span> сек</p>
                <p>Счёт: <span id="score">0</span></p>
            </div>

            <div class="game-area" id="game-area"></div>

            <script>
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
                    circle: null
                };

                startButton.addEventListener('click', startGame);

                function startGame() {
                    resetGame();
                    updateDisplay();

                    gameState.timeLeft = +gameTimeInput.value || 10;

                    const intervalId = setInterval(() => {
                        gameState.timeLeft--;
                        updateDisplay();

                        if (gameState.timeLeft <= 0) {
                            clearInterval(intervalId);
                            endGame();
                        }
                    }, 1000);
                }

                function resetGame() {
                    gameState.score = 0;
                    gameState.circleSize = difficulties[difficultySelect.value];
                    gameState.circle = null;
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
                    moveCircleRandomly();
                }

                function moveCircleRandomly() {
                    const maxX = gameArea.clientWidth - gameState.circleSize;
                    const maxY = gameArea.clientHeight - gameState.circleSize;

                    const x = Math.floor(Math.random() * maxX);
                    const y = Math.floor(Math.random() * maxY);

                    gameState.circle.style.left = \`\${x}px\`;
                    gameState.circle.style.top = \`\${y}px\`;
                }

                function endGame() {
                    alert(\`Игра закончена! Ваш счёт: \${gameState.score}\`);
                    clearGame();
                }

                function clearGame() {
                    gameArea.innerHTML = '';
                    scoreDisplay.textContent = 0;
                    timeDisplay.textContent = 0;
                    gameState.circle = null;
                }
            </script>
        </body>
        </html>
        `;

        gameWindow.document.open();
        gameWindow.document.write(html);
        gameWindow.document.close();
    }
}
