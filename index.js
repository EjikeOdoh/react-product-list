const data = [
    {
        "image": {
            "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
            "mobile": "./assets/images/image-waffle-mobile.jpg",
            "tablet": "./assets/images/image-waffle-tablet.jpg",
            "desktop": "./assets/images/image-waffle-desktop.jpg"
        },
        "name": "Waffle with Berries",
        "category": "Waffle",
        "price": 6.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
            "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
            "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
            "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
            "mobile": "./assets/images/image-macaron-mobile.jpg",
            "tablet": "./assets/images/image-macaron-tablet.jpg",
            "desktop": "./assets/images/image-macaron-desktop.jpg"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
            "mobile": "./assets/images/image-tiramisu-mobile.jpg",
            "tablet": "./assets/images/image-tiramisu-tablet.jpg",
            "desktop": "./assets/images/image-tiramisu-desktop.jpg"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
            "mobile": "./assets/images/image-baklava-mobile.jpg",
            "tablet": "./assets/images/image-baklava-tablet.jpg",
            "desktop": "./assets/images/image-baklava-desktop.jpg"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
            "mobile": "./assets/images/image-meringue-mobile.jpg",
            "tablet": "./assets/images/image-meringue-tablet.jpg",
            "desktop": "./assets/images/image-meringue-desktop.jpg"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
            "mobile": "./assets/images/image-cake-mobile.jpg",
            "tablet": "./assets/images/image-cake-tablet.jpg",
            "desktop": "./assets/images/image-cake-desktop.jpg"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
            "mobile": "./assets/images/image-brownie-mobile.jpg",
            "tablet": "./assets/images/image-brownie-tablet.jpg",
            "desktop": "./assets/images/image-brownie-desktop.jpg"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
            "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
            "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
            "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50
    }
]

const cartCount = document.querySelector('#cart-item-total')
const totalCost = document.querySelector('#total-cost span')
const modal = document.querySelector('dialog')
const modalTotal = document.querySelector('#modal-total')

let desserts = data.map((x, i) => {
    return {
        ...x,
        id: i,
        selected: false,
        price: x.price.toFixed(2),
        qty: 1
    }
})

let cart = []

function renderCards(arr) {
    const cardContainer = document.querySelector('.card-container')
    let cardContent = ''
    for (let index = 0; index < arr.length; index++) {
        const dessert = arr[index]
        cardContent += `
               <div class="card" id="${dessert.id}">
              <div class="card-img ${dessert.selected ? "active" : undefined}">
                <img src="${dessert.image.desktop}">
              </div>
              <div class="card-det">
                <div class="card-btn">
                  <button onclick="addToCart(${dessert.id})" class="add-btn ${dessert.selected ? "hidden" : undefined}">
                    <img src="./assets/images/icon-add-to-cart.svg">
                    Add to Cart
                  </button>
    
                  <div class="counter-container ${dessert.selected ? "undefined" : "hidden"}">
                    <button onclick="decreaseItemCount(${dessert.id})">
                      <img src="./assets/images/icon-decrement-quantity.svg">
                    </button>
                    <span class="qty">${dessert.qty}</span>
                    <button onclick="increaseItemCount(${dessert.id})">
                      <img src="./assets/images/icon-increment-quantity.svg">
                    </button>
                  </div>
                </div>
                <h4 class="name">${dessert.category}</h4>
                <p class="desc">${dessert.name}</p>
                <p class="price">$${dessert.price}</p>
              </div>
            </div>
        `
    }

    cardContainer.innerHTML = cardContent
}

function renderCart(arr) {
    const cartItemsContainer = document.querySelector('#cart-items')
    const emptyCartContainer = document.querySelector('.no-item-container')
    const cartItemTotal = document.querySelector('.cart-item-total')
    const modalItemsContainer = document.querySelector('#modal-cart-items')



    let cartContent = "";
    let modalCartContent = ""
    if (arr.length > 0) {
        for (let index = 0; index < arr.length; index++) {
            const item = arr[index];
            cartContent += `
                  <div class="cart-item">
              <div class="cart-item-desc">
                <h3>${item.name}</h3>
                <div class="item-desc">
                  <p class="item-qty">
                    ${item.qty}x
                  </p>
                  <p class="item-price">
                    @ $${item.price}
                  </p>
                  <p class="item-cost">
                    $${Number(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              </div>
              <button onclick="removeFromCart(${item.id})">
                <img src="./assets/images/icon-remove-item.svg">
              </button>
            </div>
            `
            modalCartContent += `
                <div class="cart-item">
                    <div class="left">
                        <div class="thumbnail">
                            <img src="${item.image.thumbnail}">
                        </div>
                        <div class="cart-item-desc">
                            <h3>${item.name}</h3>
                            <div class="item-desc">
                                <p class="item-qty">
                                ${item.qty}x
                                </p>
                                <p class="item-price">
                                @ $${item.price}
                                </p>
                            </div>
                        </div>
                    </div>
                    <p class="item-cost">
                        $${Number(item.price * item.qty).toFixed(2)}
                    </p>
            </div>
            `
        }
        calcTotal(arr)
        cartItemsContainer.innerHTML = cartContent
        modalItemsContainer.innerHTML = modalCartContent
        emptyCartContainer.classList.add('hidden')
        cartItemsContainer.classList.remove('hidden')
        cartItemTotal.classList.remove('hidden')
    } else {
        emptyCartContainer.classList.remove('hidden')
        cartItemsContainer.classList.add('hidden')
        cartItemTotal.classList.add('hidden')
        cartCount.textContent = 0;
        totalCost.textContent = 0
    }
}

function addToCart(id) {

    const item = desserts.find(x => x.id === id)
    if (item) {
        cart.push(item)
    }

    desserts = desserts.map(x => {
        return x.id === id ? { ...x, selected: true } : x
    })
    renderCards(desserts)
    renderCart(cart)
}

function increaseItemCount(id) {
    desserts = desserts.map(x => {
        return x.id === id ? { ...x, qty: (x.qty + 1) } : x
    })

    cart = cart.map(x => {
        return x.id === id ? { ...x, qty: (x.qty + 1) } : x
    })

    renderCards(desserts)
    renderCart(cart)
}

function decreaseItemCount(id) {

    const currentItem = desserts.find(x => x.id === id)

    if (currentItem.qty > 1) {
        desserts = desserts.map(x => {
            return x.id === id ? { ...x, qty: (x.qty - 1) } : x
        })

        cart = cart.map(x => {
            return x.id === id ? { ...x, qty: (x.qty - 1) } : x
        })

        renderCards(desserts)
        renderCart(cart)
    } else {
        removeFromCart(id)
    }


}

function removeFromCart(id) {
    cart = cart.filter(x => x.id !== id)
    desserts = desserts.map(x => {
        return x.id === id ? { ...x, qty: 1, selected: false } : x
    })

    renderCards(desserts)
    renderCart(cart)
}

function calcTotal(arr) {
    const count = arr.reduce((x,y)=>{
        return x + y.qty
    }, 0)

    const cost = arr.reduce((x,y)=> {
        return x + (y.qty * y.price)
    },0)

    cartCount.textContent = count
    totalCost.textContent = cost.toFixed(2)
    modalTotal.textContent = cost.toFixed(2)
}


function openModal() {
    modal.showModal()
    document.body.setAttribute('overflow', 'no-scroll')
}

function startNewOrder() {
    desserts = data.map((x, i) => {
        return {
            ...x,
            id: i,
            selected: false,
            price: x.price.toFixed(2),
            qty: 1
        }
    })
    
    cart = []

    renderCards(desserts)
    renderCart(cart)

    modal.close()
}

renderCards(desserts)
renderCart(cart)
