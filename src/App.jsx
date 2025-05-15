import { useRef, useState } from 'react'
import './App.css'
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";

import CakeThumbnail from "./assets/images/image-cake-thumbnail.jpg"
import Empty from './assets/images/illustration-empty-cart.svg'
import CarbonNeutral from './assets/images/icon-carbon-neutral.svg'
import rawData from './data'


function Card(props) {
  return (
    <div className="card">
      <div className={`card-img ${props.isActive ? 'active' : undefined}`}>
        <img src={props.imageSource} alt={props.desc} />
      </div>
      <div className="card-det">
        <div className="card-btn">
          {
            props.isActive ?
              <div className="counter-container">
                <button onClick={() => props.handleDecrease(props.id)}>
                  <FaMinus size={14} />
                </button>
                <span className="qty">{props.qty}</span>
                <button onClick={() => props.handleIncrease(props.id)}>
                  <FaPlus size={14} />
                </button>
              </div> :
              <button onClick={() => props.handleAddToCart(props.id)} className="add-btn">
                <MdOutlineAddShoppingCart size={24} />
                Add to Cart
              </button>
          }

        </div>
        <p className="name">{props.name}</p>
        <p className="desc">{props.desc}</p>
        <p className="price">${props.price}</p>
      </div>
    </div>
  )
}

function CartItem(props) {
  return (
    <div className="cart-item">
      <div className="cart-item-desc">
        <h3>{props.name}</h3>
        <div className="item-desc">
          <p className="item-qty">
            {props.qty}x
          </p>
          <p className="item-price">
            @ ${props.price}
          </p>
          <p className="item-cost">
            ${props.total}
          </p>
        </div>
      </div>
      <button onClick={()=>props.handleRemoveFromCart(props.id)}>
        <IoMdClose size={20} />
      </button>

    </div>
  )
}

function EmptyCart(props) {
  return (
    <div className="no-item-container">
      <div className="empty-cart-img">
        <img src={Empty} />
      </div>
      <p>Your added items will appear here</p>
    </div>
  )
}

function CartTotal(props) {
  return (
    <div className="cart-item-total">
      <div className="order-total">
        <p>Order Total</p>
        <p className="total-cost">
          ${props.totalCost.toFixed(2)}
        </p>
      </div>
      <div className="carbon-neutral">
        <img src={CarbonNeutral} />
        <p>This is a <span className="notice">carbon-neutral</span> delivery</p>
      </div>
      <button onClick={props.popup}>
        Confirm Order
      </button>
    </div>
  )
}

function ModalCartItem(props) {
  return (
    <div className="cart-item">
    <div className="left">
      <div className="thumbnail">
        <img src={props.thumbnail} />
      </div>
      <div className="cart-item-desc">
        <h3>{props.name}</h3>
        <div className="item-desc">
          <p className="item-qty">
            {props.qty}x
          </p>
          <p className="item-price">
            @ ${props.price}
          </p>

        </div>
      </div>
    </div>
    <p className="item-cost">
      ${props.itemTotal}
    </p>
  </div>
  )
}

function Modal(props) {

  const items =  props.data.map(item=>{
    console.log(item)
    return (
    <ModalCartItem
    thumbnail={item.image.thumbnail}
      name={item.category}
      qty={item.quantity}
      price={item.price.toFixed(2)}
      itemTotal={(item.price*item.quantity).toFixed(2)}
    />)
  })

  return (
    <dialog ref={props.target} open={props.isOpen}>
      <div className="dialog">
        <FaRegCheckCircle size={50} color='var(--green)' />
        <div className="confirm-text">
          <h1>Order Confirmed</h1>
          <p>We hope you enjoy your food</p>
        </div>
        <div className="modal-cart-items">
         {items}
        </div>
        <div className="cart-item-total">
          <div className="order-total">
            <p>Order Total</p>
            <p className="total-cost">
              ${props.total}
            </p>
          </div>

          <button onClick={props.close}>
            Start New Order
          </button>
        </div>
      </div>
    </dialog>
  )
}

function App() {

  const dialogRef = useRef(null)

  const [foodList, setFoodList] = useState(rawData.map((x, i) => {
    return { ...x, isSelected: false, id: i + 1, quantity: 1 }
  }))
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen=() => {
    setIsOpen(true)
    dialogRef.current.showModal()
  }

  const handleClose =() => {
    setIsOpen(false)
    dialogRef.current.close()
  }


  const addToCart = (id) => {
    setFoodList(prev => {
      return prev.map(x => {
        if (x.id === id) {
          return { ...x, isSelected: true }
        } else {
          return x
        }
      })
    })
  }

  const increaseCount = (id) => {
    setFoodList(prev => {
      return prev.map(x => {
        if (x.id === id) {
          return { ...x, quantity: x.quantity + 1 }
        } else {
          return x
        }
      })
    })
  }

  const decreaseCount = (id) => {
    setFoodList(prev => {
      return prev.map(x => {
        if (x.id === id) {
          if (x.quantity <= 1) {
            return { ...x, isSelected: false }
          } else {
            return { ...x, quantity: x.quantity - 1 }
          }
        } else {
          return x
        }
      })
    })
  }

  const removeFromCart =(id) => {
    setFoodList(prev => {
      return prev.map(x => {
        if (x.id === id) {
          return { ...x, isSelected: false, quantity: 1 }
        } else {
          return x
        }
      })
    })
  }

  const menu = foodList.map((food) => {
    return (
      <Card
        key={food.id}
        id={food.id}
        imageSource={food.image.desktop}
        name={food.category}
        desc={food.name}
        qty={food.quantity}
        price={food.price.toFixed(2)}
        isActive={food.isSelected}
        handleAddToCart={addToCart}
        handleIncrease={increaseCount}
        handleDecrease={decreaseCount}
      />
    )
  })

  let cartItems = foodList.filter(x => x.isSelected === true)
  const totalItems = cartItems.reduce((startingValue, item) => {
    return startingValue + item.quantity
  }, 0)
  const totalCost = cartItems.reduce((startingValue, item) => {
    return startingValue + (item.quantity*item.price)
  }, 0)

  const orders = cartItems.map(x => {
    return (
      <CartItem
        id={x.id}
        key={x.id}
        name={x.category}
        qty={x.quantity}
        price={x.price.toFixed(2)}
        total={(x.price * x.quantity).toFixed(2)}
        handleRemoveFromCart={removeFromCart}
      />
    )
  })

  return (
    <main>
      <section>
        <h1 className="title">Desserts</h1>
        <div className="card-container">
          {menu}
        </div>
      </section>
      <section className="cart-container">
        <h2>Your Cart ({totalItems})</h2>

        {
          cartItems.length === 0 ? <EmptyCart /> : (
            <>
              <div>
                {orders}
              </div>
              <CartTotal popup={handleOpen} totalCost={totalCost} />
            </>

          )
        }



      </section>

      <Modal target={dialogRef} data={cartItems} total={totalCost.toFixed(2)} isOpen={isOpen} close={handleClose} />
    </main>
  )
}

export default App
