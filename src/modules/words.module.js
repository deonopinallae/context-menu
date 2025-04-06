import { Module } from "../core/module";
import { random } from '../utils';
import styles from './words.module.css';

export class Words extends Module {
    constructor() {
        super('words', 'Угадай слово')
        this.container = this.createGameContainer()
        this.answerField = null
        this.cubes = null
        this.draggedCube = null
        this.word = null
        this.game = false
        this.mainContainer = document.querySelector('.main-container')
    }

    createGameContainer() {
        const divElement = document.createElement('div')
        divElement.className = styles['container']
        document.body.append(divElement)
        return divElement
    }

    trigger() {
        if (this.game) {
            this.clearScreen()
        }
        this.startGame()
    }

    startGame() {
        this.game = true
        this.word = this.createWord()
        const getLetters = this.splitWord(this.word)
        this.createAnswerField(getLetters.length)
        this.createCubes(getLetters)
        this.mainContainer.append(this.container)
    }

    createWord() {
        const wordList = ['hello', 'world', 'welcome']
        const getRandom = random(0, wordList.length - 1)
        return wordList[getRandom]
    }

    splitWord(word) {
        return word.split("")
    }

    createAnswerField(length) {
        const divElement = document.createElement('div')
        divElement.className = styles['answer-field']
        divElement.style.width = `${length * 53}px`

        this.answerField = divElement
        this.container.append(this.answerField)

        this.answerField.addEventListener("dragenter", event => {
            event.preventDefault()
            this.answerField.classList.add(styles.enter)
        })

        this.answerField.addEventListener("dragover", event => {
            event.preventDefault()
        })

        this.answerField.addEventListener("dragleave", event => {
            event.preventDefault()
            this.answerField.classList.remove(styles.enter)
        })

        this.answerField.addEventListener("drop", event => {
            event.preventDefault()
            this.createLetterSlot(event.dataTransfer.getData("text"))

            if (this.draggedCube) {
                this.draggedCube.remove()
                this.draggedCube = null
            }

            this.checkAnswer()
        })
    }

    createLetterSlot(letter) {
        const slot = document.createElement("div")
        slot.className = styles["base-cube"]
        slot.textContent = letter
        this.answerField.appendChild(slot)
    }

    createLetterCube(letter) {
        const cube = document.createElement("div")
        cube.className = `${styles["base-cube"]} ${styles["letter"]}`

        const rect = this.mainContainer.getBoundingClientRect();
        cube.style.left = `${random(0, rect.width - 60)}px`
        cube.style.top = `${random(0, rect.height - 60)}px`
        cube.textContent = letter
        cube.setAttribute("draggable", "true")

        cube.addEventListener("dragstart", event => {
            event.dataTransfer.setData("text", event.target.textContent)
            this.draggedCube = event.target
        })

        cube.addEventListener("dragend", () => {
            this.answerField.classList.remove(styles.over)
        })

        this.container.appendChild(cube)
        return cube
    }

    createCubes(word) {
        this.cubes = word.map(letter => this.createLetterCube(letter))
    }

    checkAnswer() {
        let message = null

        if (this.answerField.textContent.length === this.word.length) {
            if (this.answerField.textContent === this.word) {
                this.answerField.classList.add(styles.success)
                message = 'Верно!'
            } else {
                this.answerField.classList.add(styles.error)
                message = 'Не верно!'
            }
        }

        if (message) {
            const messageElement = document.createElement('span')
            messageElement.className = styles['message']
            messageElement.textContent = message
            this.container.prepend(messageElement)
            this.createButton()
        }
    }

    createButton() {
        const restartButton = document.createElement('button')
        restartButton.className = styles['button']
        restartButton.textContent = 'Начать заново'
        this.container.append(restartButton)

        restartButton.addEventListener('click', () => this.trigger())
    }

    clearScreen() {
        this.game = false
        this.word = null
        this.draggedCube = null

        if (this.cubes && this.cubes.length) {
            this.cubes.forEach(cube => cube.remove())
            this.cubes = null
        }

        if (this.answerField) {
            this.answerField.remove()
            this.answerField = null
        }

        if (this.container) {
            while (this.container.firstChild) {
                this.container.firstChild.remove()
            }
        }
    }
}
