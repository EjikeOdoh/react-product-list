export default function ModalCartItem(props) {
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