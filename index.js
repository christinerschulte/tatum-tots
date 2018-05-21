class App{
    constructor(selectors){
        this.flicks = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)

        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', (ev) =>{
                ev.preventDefault()
                this.handleSubmit(ev)
            })
    }

    renderListItem(flick){
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
        item.dataset.fav = flick.fav
        flick.fav = false

        const nameSpan = item.querySelector('.flickName')
        nameSpan.textContent = flick.name
        nameSpan.addEventListener(
            'keypress',
            this.saveOnEnter.bind(this, item, flick)
        )

        item
            .querySelector('button.delete')
            .addEventListener(
                'click', 
                this.removeListItem.bind(this, item, flick)
            )

        item
        .querySelector('button.favorite')
        .addEventListener(
            'click', 
            this.favListItem.bind(this, item, flick)
        )

        item
        .querySelector('button.edit')
        .addEventListener(
            'click', 
            this.toggleEditable.bind(this, item, flick)
        )

        // item
        // .querySelector('button.down')
        // .addEventListener(
        //     'click', 
        //     this.moveItemDown.bind(this, flick)
        // )

        return item
    }

    removeListItem(item, flick, ev){
        item.remove()

        const i = this.flicks.indexOf(flick)
        this.flicks.splice(i,1)
    }

    favListItem(item, flick, ev){
        flick.fav = item.classList.toggle('favorite')
        
    }

    toggleEditable(item, flick, ev){
        const nameField = item.querySelector('.flickName')
        const btn = item.querySelector('button.edit')

        if(nameField.isContentEditable){
            nameField.contentEditable = false

            btn.textContent = 'edit'
            btn.classList.remove('success')

            flick.name = nameField.textContent
        } else {
            nameField.contentEditable = true
            nameField.focus()

            btn.textContent = 'save'
            btn.classList.add('success')
        }
    }

    saveOnEnter(item, flick, ev){
        if(ev.key === 'Enter'){
            this.toggleEditable(item, flick)
        }
    }

    // moveItemUp(flick, ev){
    //     const listItem = ev.target.closest('.flick')
    //     const i = ev.indexOf(listItem) 
        
    // }

    // moveItemDown(flick, ev){
    //     const listItem = ev.target.closest('.flick')
    //     const i = this.flicks.indexOf(flick)        
    // }

    handleSubmit(ev){
        const f = ev.target
        const flick = {
            id: ++this.max,
            name: f.flickName.value,
            fav: false,
        }

        this.flicks.unshift(flick)

        const item = this.renderListItem(flick)
        this.list.insertBefore(item, this.list.firstChild)
        f.reset()
    }

}

const app = new App({
    formSelector:'#flickForm',
    listSelector: '#flickList',
    templateSelector: '.flick.template',
})