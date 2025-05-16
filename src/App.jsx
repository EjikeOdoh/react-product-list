import { useRef, useState, useReducer} from 'react'
import './App.css'

import rawData from './data'

// Components
import Card from './components/Card'
import CartItem from './components/CartItem';
import EmptyCart from './components/EmptyCart';
import CartTotal from './components/CartTotal';
import Modal from './components/Modal'

// reducers
import cartReducer from './reducers/CartReducer';

function App() {

  const dialogRef = useRef(null)
  const [foodList, dispatch] = useReducer(cartReducer, rawData.map((x, i) => {
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
    dispatch({
      type: 'add',
      id: id
    })
  }

  const increaseCount = (id) => {
    dispatch({
      type:'increase',
      id: id
    })
  }

  const decreaseCount = (id) => {
    dispatch({
      type:'decrease',
      id: id
    })
  }

  const removeFromCart =(id) => {

    dispatch({
      type:'remove',
      id: id
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
