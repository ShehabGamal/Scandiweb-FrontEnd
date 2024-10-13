import React, { Component } from 'react';
import './ProductDetailsPageStyle.css';
import Slider from '../components/Slider.js'



class ProductDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        product:[],
        attributes:[],
        attributeNames:[],
        selectedChoices:{},
    };
  }

  componentDidMount() {
    const {currentProductId} = this.props;

    if(currentProductId){
    fetch('http://shehab-gamal334.serv00.net:38837/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{getProductById(id:"${currentProductId}"){ id name  description brand amount currency_symbol attributes { id name value }}}`,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          product: data.data.getProductById,
          attributes:data.data.getProductById.attributes,
          attributeNames:data.data.getProductById.attributes.map((value)=>{return value.name}).filter((value,index,array)=>{return array.indexOf(value) === index})
          
        })
      )
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }
  }
  removeHTMLTags(htmlString) {
    
    const parser = new DOMParser();
    
    const doc = parser.parseFromString(htmlString, 'text/html');
    
    const textContent = doc.body.textContent || "";
    
    return textContent.trim();
} 
handleChoiceClick = (attributeName, value) => {
  this.setState((prevState) => ({
    selectedChoices: {
      ...prevState.selectedChoices,
      [attributeName]: value, 
    },
  }));
};
  render() {
    const {isCartOpen}=this.props;
    return (
     <div className={`holder ${isCartOpen ? 'disabled' : ''}`}
          style={{
                 opacity: isCartOpen ? 0.5 : 1,
                  pointerEvents: isCartOpen ? 'none' : 'auto', 
    }}>
     <Slider id={this.state.product.id} data-testid='product-gallery'/>
     <div className='product-properities'>
        <div className='name'>
          {this.state.product.name}
        </div>
        <div className="size">
        {this.state.attributeNames.map((header, headerIndex) => (
              <>
              <div key={headerIndex} className="size-tag">
              {header}
              </div>
                <div className="choices">
                  {this.state.attributes
                      .filter((attribute) => attribute.name === header)
                      .map((attribute, index) => (
                              <div className={`size-choice ${
                                this.state.selectedChoices[header] === attribute.value
                                  ? header === 'Color'
                                    ? 'active-color'
                                    : 'active'
                                  : ''
                              }`}
                                style={{
                                backgroundColor: header === 'Color' ? attribute.value : "",
                              }} key={attribute.value}
                                 onClick={() => this.handleChoiceClick(header, attribute.value)}
                                 data-testid={`product-attribute-${attribute.value}`}>
                                {header==='Color'?" ":attribute.value}
                              </div>
                        ))}
                 </div>
            </>
         ))}
        </div>
        <div className='price'>
          <div className='price-tag'>PRICE:</div>
          <div className='price-amount'>{this.state.product.currency_symbol}{this.state.product.amount}</div>
        </div>
        <button className='add-to-cart' data-testid='add-to-cart'>
        Add to cart
        </button>
        <div className='description' data-testid='product-description'>
          {this.removeHTMLTags(this.state.product.description)}
        </div>
     </div>
     </div>)
 }}

export default ProductDetailsPage;
