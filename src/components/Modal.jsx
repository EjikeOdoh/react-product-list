import { FaRegCheckCircle } from "react-icons/fa"
import ModalCartItem from "./ModalCartItem"

export default function Modal(props) {

  const items =  props.data.map(item=>{
    return (
    <ModalCartItem
    key={item.id}
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
