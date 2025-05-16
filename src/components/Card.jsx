import { FaMinus, FaPlus } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";

export default function Card(props) {
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