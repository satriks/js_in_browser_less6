document.querySelectorAll('.product__quantity-control').forEach(el => el.addEventListener('click', changeQuantity))
document.querySelectorAll('.product__add').forEach(el => el.addEventListener('click', addToCart))
let myIntrval = 0;



function changeQuantity() {

    let symbol = Array.from(this.classList)
    let quant = Number(this.closest('.product__quantity-controls').querySelector('.product__quantity-value').innerText)
    
    if (symbol.includes('product__quantity-control_inc')) {      
        quant++
    } else if (symbol.includes('product__quantity-control_dec')) {
        quant > 1? quant-- : quant  
    }

    this.closest('.product__quantity-controls').querySelector('.product__quantity-value').innerText = quant   
}

function addToCart() {
    const quantity = this.previousElementSibling.querySelector('.product__quantity-value').innerText;   
    const id = this.closest('.product').dataset.id;
    const picture = this.closest('.product').querySelector('.product__image');
    const cart = document.querySelector('.cart__products')
    const prodIdInCart = Array.from(document.querySelectorAll('.cart__product')).map(el => el.dataset.id)

    let div = document.createElement('div')
    div.innerHTML = `
    <div class="cart__product" data-id="${id}">
        <img class="cart__product-image" src="${picture.src}">
        <div class="cart__product-close">&times;</div>
        <div class="cart__product-count">${quantity}</div>
        <div class="cart-control">
            <div class="minus">-</div>
            <div class="plus">+</div>
        </div>   
        </div>`
        console.log(this);
        
    // console.log(prodIdInCart);
    // console.log(id.toString());

    prodIdInCart.includes(id)? document.querySelector(`[data-id="${id}"]`).querySelector('.cart__product-count').innerText = Number(document.querySelector(`[data-id="${id}"]`).querySelector('.cart__product-count').innerText) + Number(quantity):  cart.append(div);   
    prodIdInCart.includes(id)? div = document.querySelector(`[data-id="${id}"]`) : div = div
    if (cart.children.length > 0){
        console.log(cart.children, 'chil');
        Array.from( cart.children).forEach(el => el.querySelector(".plus").addEventListener('click', cartQuantity))
        Array.from( cart.children).forEach(el => el.querySelector(".minus").addEventListener('click', cartQuantity))
    }
    cart.querySelectorAll('.cart__product-close').forEach(el => el.addEventListener('click', removeProduct))
    document.querySelector('.cart').classList.remove('hidden')
    createPicture(picture, div)
}  

function cartQuantity() {
    const quantity = Number(this.parentElement.previousElementSibling.innerText)

    if (this.classList.value == 'plus') {
        this.parentElement.previousElementSibling.innerText =quantity + 1
    } else if (this.classList.value == 'minus'){
        if (quantity > 1) {
        this.parentElement.previousElementSibling.innerText = quantity - 1
        } else {
            this.closest('.cart__product').parentElement.remove()
            checkCart()

        }
    }
}

function removeProduct() {
    this.closest('.cart__product').parentElement.remove()
    checkCart()

}

function checkCart() {
    const cart = document.querySelector('.cart__products')
    if (cart.children.length < 1) {
        cart.closest('.cart').classList.add('hidden')
    }
    
}

function createPicture(picture, goal) {

    const img = document.createElement('img')
    img.src = picture.src
    img.classList.add('move-pict')
    img.style.position = "absolute"
    img.style.top = `${picture.offsetTop}px`
    img.style.left = "0px"
    img.style.width = "100px"
    img.style.objectFit = "contain"
    document.querySelector('.product').append(img)

    console.log(picture,  goal , 'tagr');
    console.log(goal.offsetLeft, picture.offsetLeft,  'offsets');
    
    const topOffset = (goal.offsetTop - picture.offsetTop) / 30
    const leftOffset = (goal.offsetLeft - picture.offsetLeft) / 30

    myIntrval = setInterval ((() => movePicture(leftOffset, topOffset, img, goal.offsetTop)), 2)
}

function movePicture(left, top, img, stop) {

    if (stop > img.offsetTop) {
        clearInterval(myIntrval)
        img.remove()
    }

    console.log(left, top, img, stop, 'paramssssssss');

    img.style.top = `${img.offsetTop + top}px`
    img.style.left = `${img.offsetLeft + left}px`
    
}

function saveToStorage() {
    //Хранение
    
}

function printFromStorage() {
    //Отрисовка
}
