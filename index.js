const app = {
    init(selectors){
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
    },

    renderListItem(flick){
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
        item
            .querySelector('.flickName')
            .textContent = flick.name

        item
            .querySelector('button.delete')
            .addEventListener('click', this.removeListItem.bind(this, flick))

        item
        .querySelector('button.favorite')
        .addEventListener('click', this.favListItem.bind(this, flick))
        return item
    },

    removeListItem(flick, ev){
        const listItem = ev.target.closest('.flick')
        listItem.remove()

        const i = this.flicks.indexOf(flick)
        this.flicks.splice(i,1)
    },

    favListItem(flick, ev){
        const listItem = ev.target
        listItem.style.backgroundColor = 'gold'

        // const i = this.flicks.indexOf(flick)
        // this.flicks.splice(i,1)
    },

    handleSubmit(ev){
        const f = ev.target
        const flick = {
            id: ++this.max,
            name: f.flickName.value,
        }

        this.flicks.unshift(flick)

        const item = this.renderListItem(flick)
        this.list.insertBefore(item, this.list.firstChild)
        f.reset()
    },

}

app.init({
    formSelector:'#flickForm',
    listSelector: '#flickList',
    templateSelector: '.flick.template',
})