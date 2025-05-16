import Empty from '../assets/images/illustration-empty-cart.svg'

export default function EmptyCart(props) {
    return (
      <div className="no-item-container">
        <div className="empty-cart-img">
          <img src={Empty} />
        </div>
        <p>Your added items will appear here</p>
      </div>
    )
  }