import {Module} from '../core/module'
import {random} from '../utils'

export class Advices extends Module{
    constructor(){
        super('getAdvice', 'Получить совет')
        this.advicesArr = fetch('https://raw.githubusercontent.com/deonopinallae/advices/main/advices.json')
        .then(responce => responce.json())
        .then(data => data)
        .catch(error => console.log('error', error))

        this.$rootElement = document.createElement('div')
        this.$rootElement.className = 'advice-ball__container'

        this.light = document.createElement('div')
        this.light.className = 'advice-ball__light'

        this.ballImg = document.createElement('div')
        this.ballImg.className = 'advice-ball'

        this.ballImg.append(this.light)
        this.$rootElement.append(this.ballImg)

        this.adviceText = document.createElement('p')
        // this.adviceText.textContent = random(0, 111)

    }
    trigger(){
        this.$rootElement.style.display = 'flex'
        this.$rootElement.style.opacity = '0'
        this.$rootElement.style.animationName = ''
        this.$rootElement.style.transform = 'scale(1)'
        this.light.style.animationName = ''
        this.light.style.transform = 'scale(1)'

        document.body.append(this.$rootElement)
        setTimeout(() => this.$rootElement.style.opacity = '1', 100)
        setTimeout(() => this.light.style.animationName = 'light-animation', 500)
        setTimeout(() => {
            this.$rootElement.style.animationName = 'container-animation'
            this.$rootElement.addEventListener('animationend', () => this.$rootElement.style.display = 'none', { once: true })
        }, 4500)

        console.log(this.advicesArr)
        console.log(this.advicesArr.find(el => el[random(0, 111)]))
        
    }
}