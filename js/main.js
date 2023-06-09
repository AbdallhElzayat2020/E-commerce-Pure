function overlayIt() {
    document.body.classList.add("overlay")
}
function unOverlayIt() {
    document.body.classList.remove("overlay")
}
function toArray(iterable) {
    return [...iterable]
}

/////////////////////////////////////////////////////////////////////////////////////////////////

// Open and close menu //
let menu = document.getElementById("menu")
let openMenuBtn = document.getElementById("open_menu");
let closeMenuBtn = document.getElementById("close_menu")
openMenuBtn.addEventListener("click", () => {
    overlayIt()
    menu.classList.add("open")
})
closeMenuBtn.addEventListener("click", () => {
    unOverlayIt()
    menu.classList.remove("open")
})

////////////////////////////////////////////////////////////////////////////////////////////////

// Open and close cart //
let cartIcon = document.getElementById("cart_icon");
let cartContents = document.getElementById("cart_contents");
cartIcon.addEventListener("click", () => {
    cartContents.classList.toggle("open")
})

////////////////////////////////////////////////////////////////////////////////////////////////

// Product Image Handle //
let prImgCnt = document.querySelector(".product .product-image:not(.product-full-image)")
let prImgFullCnt = document.querySelector(".product .product-full-image")
let prImgFullCloseBtn = document.querySelector(".product .product-full-image button.close")
let prImgsViewCnts = document.querySelectorAll(".product .product-image .seen .images")
let prImgsViewNotFullCnt = document.querySelector(".product .product-image:not(.product-full-image) .seen .images")
let prThumbs = document.querySelectorAll(".product .product-image .thumbnails")
let selectedPrImgIndex = 0

function viewProductImage(index) {
    toArray(prImgsViewCnts).forEach(el => {
        toArray(el.children).forEach((el) => el.classList.remove("seen-image"))
        toArray(el.children)[index].classList.add("seen-image")
    })
}
function selectProductImage(index) {
    toArray(prThumbs).forEach(el => {
        toArray(el.children).forEach((el) => el.classList.remove("selected"))
        toArray(el.children)[index].classList.add("selected")
    })
}

toArray(prThumbs).forEach(el => {
    toArray(el.children).forEach((element, index) => {
        element.addEventListener("click", () => {
            selectedPrImgIndex = index
            viewProductImage(index)
            selectProductImage(index)
        })
    });
});
toArray(prImgsViewNotFullCnt.children).forEach(el => {
    el.addEventListener("click", () => {
        overlayIt()
        prImgFullCnt.classList.add("show")
    })
})

prImgFullCloseBtn.addEventListener("click", () => {
    unOverlayIt()
    prImgFullCnt.classList.remove("show")
})
prImgFullCloseBtn.addEventListener("mouseover", () => {
    prImgFullCloseBtn.firstElementChild.firstElementChild.setAttribute("fill", "#FF7D1A")
})
prImgFullCloseBtn.addEventListener("mouseout", () => {
    prImgFullCloseBtn.firstElementChild.firstElementChild.setAttribute("fill", "#FFFFFF")
})

////////////////////////////////////////////////////////////////////////////////////////////////

// Product Image Handle Conrols //
let prImgPrevBtns = document.querySelectorAll(".product .product-image .seen .btn.left")
let prImgNextBtns = document.querySelectorAll(".product .product-image .seen .btn.right")

toArray(prImgPrevBtns).forEach(el => {
    el.addEventListener("click", () => {
        if (selectedPrImgIndex > 0) selectedPrImgIndex--
        else selectedPrImgIndex = prImgsViewNotFullCnt.children.length - 1 
        viewProductImage(selectedPrImgIndex)
        selectProductImage(selectedPrImgIndex)
    })
})
toArray(prImgNextBtns).forEach(el => {
    el.addEventListener("click", () => {
        if (selectedPrImgIndex + 1 < prImgsViewNotFullCnt.children.length) selectedPrImgIndex++ 
        else selectedPrImgIndex = 0
        viewProductImage(selectedPrImgIndex)
        selectProductImage(selectedPrImgIndex)
    })
})

///////////////////////////////////////////////////////////////////////////////////////////////

// Cart Handler
let numsInCart = 0
let prInCartCnt = document.querySelector(".navbar .cart .contents .products-cart")

function addInCart(thumbnail, prName, prPrice, prCount, prId) {
    let product = document.createElement("div")
    product.classList.add("product-cart")
    product.setAttribute("data-id", prId)
    product.setAttribute("data-count", prCount)

    let image = document.createElement("img")
    image.classList.add("product-cart-image")
    image.setAttribute("src", thumbnail)
    image.setAttribute("alt", "Product Image")

    let text = document.createElement("div")
    text.classList.add("text")

    let name = document.createElement("p")
    name.classList.add("name")
    name.textContent = prName

    let price = document.createElement("p")
    price.classList.add("price")
    price.textContent = `$${prPrice.toFixed(2)} x ${prCount} `

    let total = document.createElement("b")
    total.textContent = `$${(prPrice * prCount).toFixed(2)}`

    price.appendChild(total)

    text.append(name, price)

    let deleteBtn = document.createElement("button")
    deleteBtn.classList.add("delete", "right-flex", "btn")

    let deleteIcon = document.createElement("img")
    deleteIcon.setAttribute("src", "images/icon-delete.svg")
    deleteIcon.setAttribute("alt", "Delete Icon")

    deleteBtn.appendChild(deleteIcon)

    product.append(image, text, deleteBtn)

    prInCartCnt.appendChild(product)

    numsInCart += prCount

    updateCartStatus()

    deleteBtn.addEventListener("click", () => {
        deleteBtn.parentElement.remove()
        numsInCart -= parseInt(deleteBtn.parentElement.getAttribute("data-count"))
        updateCartStatus()
    })
}
function updateCartStatus() {
    let numsInCartIcon = document.querySelector(".navbar .cart .icon .counter");
    let checkoutBtn = document.querySelector(".navbar .cart .contents .products-cart button.checkout")
    
    if (numsInCart > 0) {
        prInCartCnt.classList.remove("empty")
        if (!checkoutBtn) {
            let checkoutBtn = document.createElement("button")
            checkoutBtn.classList.add("main-btn", "checkout")
            checkoutBtn.textContent = "Checkout"
            prInCartCnt.appendChild(checkoutBtn)
        }
        numsInCartIcon.textContent = numsInCart
    } else {
        prInCartCnt.innerHTML = ""
        prInCartCnt.classList.add("empty")
        numsInCartIcon.textContent = 0
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////

// Count Items Number //
let prItemsCounterEl = document.querySelector(".product .details .controls .counter .count")
let prItemsCounterMinusBtn = document.querySelector(".product .details .controls .counter button.minus")
let prItemsCounterPlusBtn = document.querySelector(".product .details .controls .counter button.plus")
let itemsCounter = 0
function updateCounter() {
    prItemsCounterEl.textContent = itemsCounter
}
prItemsCounterMinusBtn.addEventListener("click", () => {
    itemsCounter <=0 ? itemsCounter : itemsCounter--
    updateCounter()
})
prItemsCounterPlusBtn.addEventListener("click", () => {
    itemsCounter++
    updateCounter()
})

//////////////////////////////////////////////////////////////////////////////////////////////

// Add Cart //
let addInCartBtn = document.querySelector(".product .details .controls button.add")
let prDetails = document.querySelector(".product .details")
addInCartBtn.addEventListener("click", () => {
    let thumbnail = prDetails.getAttribute("data-thumbnail")
    let name =prDetails.getAttribute("data-name");
    let price = parseInt(prDetails.getAttribute("data-price"))
    let id = prDetails.getAttribute("data-id");
    let productExsist = document.querySelector(
        `.navbar .cart .contents .products-cart [data-id="${prDetails.getAttribute("data-id")}"]`
    )
    let itemsCount = itemsCounter
    itemsCounter = 0
    updateCounter()
    if (productExsist) {
        productExsist.remove()
        numsInCart -= parseInt(productExsist.getAttribute("data-count"))
        itemsCount += parseInt(productExsist.getAttribute("data-count"))
        updateCartStatus()
    }

    addInCart(thumbnail, name, price, itemsCount, id)
})