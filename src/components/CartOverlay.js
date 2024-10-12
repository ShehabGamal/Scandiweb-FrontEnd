import React, { Component } from 'react';
import './CartOverlayStyle.css'


class CartOverlay extends Component {
  
  render() { 
    const {cartItemsCount}=this.props
    return (
                      <>
                        <div className='cart-wrapper' >
                          <div className='cart-holder'>
                              <div className='items-count'><b>My Bag</b>: {cartItemsCount} {cartItemsCount===1?"item":"items"}</div>
                                
                            <div className='cart-item'>
                                <div className='info'>
                                  <div className='product-name'>
                                    Apple Air-Tags
                                  </div>
                                  <div className='product-price-amount'>$50.00</div>  
                              <div className='product-size'>
                                <div className='product-size-tag'>SIZE:</div>
                                  <div className='product-choices'> 
                                    <div className='product-size-choice'>XS</div>
                                    <div className='product-size-choice'>S</div>
                                    <div className='product-size-choice'>M</div>
                                    <div className='product-size-choice'>L</div>
                                 </div>
                                </div>
                                <div className='product-colors'>
                                <div className='product-color-tag'>COLOR:</div>
                                  <div className='product-color-choices'> 
                                    <div className='avail-option A'></div>
                                    <div className='avail-option B'></div>
                                    <div className='avail-option C'></div>
                                  </div>
                                </div>
                               </div>
                               <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000" alt="" className='product-image'/>    
                            </div>
                     <button className='place-order'>
                              Place Order
                     </button>
                     </div>
                     </div>                         
                     
                    </>

    )                
  
}}

export default CartOverlay;
