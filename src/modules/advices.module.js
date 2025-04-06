import { Module } from '../core/module'
import { random } from '../utils'
// import  './modules-styles/advices.module.css'

export class Advices extends Module {
    constructor() {
        super('getAdvice', 'Получить совет')

        this.advices = []
        this.loadAdvices();

        this.$rootElement = document.createElement('div')
        this.$rootElement.className = 'advice-ball__container'

        this.light = document.createElement('div')
        this.light.className = 'advice-ball__light'

        this.ballImg = document.createElement('div')
        this.ballImg.className = 'advice-ball'

        this.ballImg.append(this.light)
        this.$rootElement.append(this.ballImg)

        this.adviceText = document.createElement('p')
        this.adviceText.className = ('advice__text')

        // const mainContainer = document.querySelector(".main-container")
        // mainContainer.append(this.$rootElement)
    }

    async loadAdvices() {
        try {
            const response = await fetch('https://raw.githubusercontent.com/deonopinallae/advices/main/advices.json')
            const data = await response.json()
            this.advices = data.advices || []
        } catch (error) {
            console.error('Ошибка загрузки:', error)
            this.advices = ["Советы не загрузились :("]
        }

    }

    trigger() {
        this.ballImg.style.display = 'block'
        this.ballImg.style.opacity = '0'
        this.ballImg.style.animationName = ''
        this.ballImg.style.transform = 'scale(1)'
        this.light.style.animationName = ''
        this.light.style.transform = 'scale(1)'
        this.adviceText.style.opacity = '0'

        document.body.append(this.$rootElement)
        setTimeout(() => this.ballImg.style.opacity = '1', 100)
        setTimeout(() => this.light.style.animationName = 'light-animation', 500)
        setTimeout(() => {
            this.ballImg.style.animationName = 'container-animation'
            this.ballImg.addEventListener('animationend', () => {
                this.ballImg.style.display = 'none'
                this.$rootElement.append(this.adviceText)    
                setTimeout(() => {
                    this.adviceText.style.opacity = '1'
                }, 300)
                
            }, { once: true })
        }, 4500)

        if (this.advices.length === 0) {
            this.adviceText.textContent = "Загрузка..."
            return
        }
        this.adviceText.textContent = this.advices[random(0, this.advices.length - 1)]
        
        console.log(this.adviceText.textContent)

    }
}