import CarbonNeutral from '../assets/images/icon-carbon-neutral.svg'

export default function CartTotal(props) {
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