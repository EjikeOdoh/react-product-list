import { IoMdClose } from "react-icons/io";

export default function CartItem(props) {
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