import React, { Component } from 'react';
import './HeaderStyle.css';
import Logo from '../Assets/logo.svg';
import EmptyCart from '../Assets/emptycart.svg'
import CartOverlay from './CartOverlay';
import { Link } from 'react-router-dom';
class Header extends Component {


  render() {
    const { categories,activeCategory, onCategorySelect, cartItemsCount,onCartOpen,isCartOpen} = this.props;

    return ( 
      <header>
        <nav>
          {categories.map((category,index) => (
            <div
              key={index}
              data-testid={category.name === activeCategory ? 'active-category-link' : 'category-link'}
              onClick={() => onCategorySelect(category.name)}
              
            >
              {category.name.toUpperCase()}
            </div>
          ))}
        </nav>
        <Link to="/" className='link'>
        <img src={Logo} alt="logo"/>
        </Link> 
        <div className="cart">
          <button data-testid="cart-btn" onClick={onCartOpen}>
          <img src={EmptyCart} alt="empty-cart"/>{cartItemsCount > 0 && <span>{cartItemsCount}</span>}
          </button> 
        </div>
        {isCartOpen?<CartOverlay cartItemsCount={cartItemsCount}/>:""}  
      </header>
    );
  }
}

export default Header;
