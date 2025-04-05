export class MainPage {
    constructor(title, text){
        this.title = document.createElement('h1')
        this.title.textContent = title
        this.title.className = 'main-page-info'
        this.title.style.fontFamily = '"Great Vibes", cursive'

        this.text = document.createElement('p')
        this.text.textContent = text
        this.text.className = 'main-page-info'
        this.text.style.fontFamily = '"Great Vibes", cursive'

        document.body.append(this.title, this.text)
    }
}