import React, { Component } from 'react';
import './ProductListingPageStyle.css'
import { Link } from 'react-router-dom';



class ProductListingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
 
  componentDidMount() {
 
    fetch('http://shehab-gamal334.serv00.net:38837/graphql', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        query: "{ getProducts { id name currency_symbol amount gallery in_stock category { name } } }"
      })
    })
      .then(res => res.json())
      .then( data =>
        this.setState({
          products: data.data.getProducts
  })
 
)     
 
 
  }
  render() {
    const {activeCategory,toggleProduct,isCartOpen}=this.props
    return (
      
      <div className={`products-page ${isCartOpen ? 'disabled' : ''}`}
           style={{
             opacity: isCartOpen ? 0.5 : 1,
             pointerEvents: isCartOpen ? 'none' : 'auto', 
            }}>
      <h1 className='active-category'>{activeCategory.toUpperCase()}</h1>
      <div className="product-list">
      <div className={`products-page ${isCartOpen ? 'disabled' : ''}`}
           style={{
             opacity: isCartOpen ? 0.5 : 1,
             pointerEvents: isCartOpen ? 'none' : 'auto', 
            }}>
      <div className="product-list">
      {activeCategory==="all"?this.state.products.map((product,index)=>(
            product.in_stock?
            <div data-testid ={`product-${product.name.toLowerCase().replace(" ","-")}`}>
            <Link key={index} to={`product/${product.id}`} onClick={()=>{toggleProduct(product.id)}}  className='link'>  
            <div  id={product.id} className={product.in_stock ? 'product-item-inStock' : 'product-item-outStock'} >
            <div className='out-of-stock'>
            <h2>Out Of Stock</h2>
            </div>
          <img src={product.gallery.split(' ').map(url => url.trim())[0].replace(/[[\]"]/g, '').slice(0, -1)} alt={product.id} className='kebab-case'/>
          <p className='product-attributes'> {product['name']}<br/><b>{product.currency_symbol}{product.amount}</b></p>
          </div>
          </Link>
          </div>: <div  id={product.id} data-testid ={`product-${product.id}`} className={product.in_stock ? 'product-item-inStock' : 'product-item-outStock'} >
            <div className='out-of-stock'>
            <h2>Out Of Stock</h2>
            </div>
          <img src={product.gallery.split(' ').map(url => url.trim())[0].replace(/[[\]"]/g, '').slice(0, -1)} alt={product.id} className='kebab-case'/>
          <p className='product-attributes'> {product['name']}<br/><b>{product.currency_symbol}{product.amount}</b></p>
        </div>))
        :this.state.products.filter((product)=>(product.category['name']===activeCategory)).map((product,index)=>(
            product.in_stock?
            <div data-testid ={`product-${product.id}`}>
            <Link key={index} to={`${activeCategory==="all"?"":`${activeCategory}/`}product/${product.id}`} onClick={()=>{toggleProduct(product.id)}}  className='link'>  
            <div  id={product.id} className={product.in_stock ? 'product-item-inStock' : 'product-item-outStock'} >
            <div className='out-of-stock'>
            <h2>Out Of Stock</h2>
            </div>
          <img src={product.gallery.split(' ').map(url => url.trim())[0].replace(/[[\]"]/g, '').slice(0, -1)} alt={product.id} className='kebab-case'/>
          <p className='product-attributes'> {product['name']}<br/><b>{product.currency_symbol}{product.amount}</b></p>
        </div>
        </Link>
        </div>: <div  id={product.id} data-testid ={`product-${product.id}`} className={product.in_stock ? 'product-item-inStock' : 'product-item-outStock'} >
            <div className='out-of-stock'>
            <h2>Out Of Stock</h2>
            </div>
          <img src={product.gallery.split(' ').map(url => url.trim())[0].replace(/[[\]"]/g, '').slice(0, -1)} alt={product.id} className='kebab-case'/>
          <p className='product-attributes'> {product['name']}<br/><b>{product.currency_symbol}{product.amount}</b></p>
        </div>))}
      </div>
      </div>  
      </div>
      </div>
    );
  }
}
 
export default ProductListingPage;