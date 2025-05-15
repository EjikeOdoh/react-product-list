import { useRef, useState } from 'react'
import './App.css'
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

import Cake from "./assets/images/image-cake-desktop.jpg"
import Empty from './assets/images/illustration-empty-cart.svg'
import CarbonNeutral from './assets/images/icon-carbon-neutral.svg'


function Card(props) {
  return (
    <div className="card">
      <div className={`card-img ${props.isActive ? 'active' : undefined}`}>
        <img src={Cake} />
      </div>
      <div className="card-det">
        <div className="card-btn">

          {
            props.isActive ?
              <div className="counter-container">
                <button>
                  <FaMinus size={14} />
                </button>
                <span className="qty">1</span>
                <button>
                  <FaPlus size={14} />
                </button>
              </div> :
              <button className="add-btn">
                <MdOutlineAddShoppingCart size={24} />
                Add to Cart
              </button>
          }

        </div>
        <p className="name">Waffle</p>
        <p className="desc">Waffle with Berries</p>
        <p className="price">$6.50</p>
      </div>
    </div>
  )
}

function CartItem(props) {
  return (
    <div className="cart-item">
      <div className="cart-item-desc">
        <h3>Tiramisu</h3>
        <div className="item-desc">
          <p className="item-qty">
            1x
          </p>
          <p className="item-price">
            @ $6.50
          </p>
          <p className="item-cost">
            $13.00
          </p>
        </div>
      </div>
      <button>
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
        $46.50
      </p>
    </div>
    <div className="carbon-neutral">
      <img src={CarbonNeutral} />
      <p>This is a <span className="notice">carbon-neutral</span> delivery</p>
    </div>
    <button>
      Confirm Order
    </button>
  </div>
  )
}

function Modal(props) {

  return (
  
    <dialog open={true}>
      <div class="dialog">
        <img class="confirm-img" src="./assets/images/icon-order-confirmed.svg" />
        <div class="confirm-text">
          <h1>Order Confirmed</h1>
          <p>We hope you enjoy your food</p>
        </div>
        <div class="modal-cart-items" id="modal-cart-items">
          <div class="cart-item">
            <div class="left">
              <div class="thumbnail">
                <img src="./assets/images/image-baklava-thumbnail.jpg" />
              </div>
              <div class="cart-item-desc">
                <h3>Classic Tiramisu</h3>
                <div class="item-desc">
                  <p class="item-qty">
                    1x
                  </p>
                  <p class="item-price">
                    @ $6.50
                  </p>
  
                </div>
              </div>
            </div>
            <p class="item-cost">
              $13.00
            </p>
          </div>
        </div>
        <div class="cart-item-total">
          <div class="order-total">
            <p>Order Total</p>
            <p class="total-cost">
              $<span id="modal-total">46.50</span>
            </p>
          </div>
  
          <button onclick="startNewOrder()">
            Start New Order
          </button>
        </div>
      </div>
    </dialog>
  )
}

function App() {

  return (
    <main>
      <section>
        <h1 className="title">Desserts</h1>
        <div className="card-container">
          <Card isActive={true} />
          <Card isActive={false} />
          <Card isActive={false} />
        </div>
      </section>
      <section className="cart-container">
        <h2>Your Cart (<span id="cart-item-total">7</span>)</h2>

      <EmptyCart />

        <div>
          <CartItem />
          <CartItem />
        </div>
        <CartTotal />
      </section>

      <Modal />
    </main>
  )
}

export default App
