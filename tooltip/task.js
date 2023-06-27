(function () {
    document.addEventListener('DOMContentLoaded', addTooltip)
    const tooltips = document.querySelectorAll('.has-tooltip')
    tooltips.forEach(el => el.addEventListener('click', tooltip))
    const tipPossition = 'bottom'

    function tooltip(event) {
        event.preventDefault();

        if (!checkActiv(this)){
            tooltips.forEach( el => checkActiv(el))
            
            this.nextElementSibling.classList.add('tooltip_active')
        }
    }

    function checkActiv(el) {
        if (Array.from(el.nextElementSibling.classList).includes('tooltip_active')){
            el.nextElementSibling.classList.remove('tooltip_active')
            return true
        }     
    }
    
    function addTooltip(event) {
        tooltips.forEach(el => {
            let data = {
                top: el.offsetTop,
                left: el.offsetLeft,
                right: el.offsetRight,
                width: el.offsetWidth,
                height: el.offsetHeight,
                text: el.title
            
            }
            let addElement = getTooltip(data)
            el.insertAdjacentElement('afterend' , addElement)
            setPosition(addElement, data)
            })
        
    }

    function getTooltip(data) {

        tool = document.createElement('div')

        tool.classList.add("tooltip")

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
            case 'bottom': 
                element.style.top = `${data.top + data.height}px`
                break;
            case 'left': 
                element.style.left = `${data.left - element.offsetWidth}px`
                break;
            case 'right': 
                element.style.left = `${data.left + data.width}px`
                break;
        } 

    }
})()
