(function () {

    const toltips = document.querySelectorAll('.has-tooltip')
    toltips.forEach(el => el.addEventListener('click', toltip))
    const tipPossition = 'button'

    function toltip(event) {
        event.preventDefault();

        let data = {
            top: this.offsetTop,
            left: this.offsetLeft,
            right: this.offsetRight,
            width: this.offsetWidth,
            height: this.offsetHeight,
            text: this.title
        
        }

        toltips.forEach(el => {
            if (el.children.length > 0) {
                el.removeChild(el.firstChild)
            }
        })

        let addElement = getTooltip(data)
        this.prepend(addElement)
        setPosition(addElement, data)
    }

    function getTooltip(data) {

        tool = document.createElement('div')

        tool.classList.add("tooltip")
        tool.classList.add("tooltip_active")

        tool.innerText= data.text

        tool.style.top = `${data.top}px`
        tool.style.left = `${data.left}px`
        tool.style.position = `absolute`

        tool.dataset.position = tipPossition

        return tool

    }

    function setPosition(element, data) {

        switch (element.dataset.position) {
            case 'top': 
                element.style.top = `${data.top - data.height - 10}px`
                break;
            case 'button': 
                element.style.top = `${data.top + data.height}px`
                break;
            case 'left': 
                element.style.left = `${data.left - element.offsetWidth}px`
                break;
            case 'rigth': 
                element.style.left = `${data.left + data.width}px`
                break;
        } 

    }
})()
