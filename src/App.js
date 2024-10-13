import React, { Component } from 'react';
import Header from './components/Header';
import './App.css';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailsPage from'./pages/ProductDetailsPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categories: [],
      activeCategory: 'all',
      cartItems: ["btgnan", "m5alel"],
      isCartOpen: false,
      total: 0,
      currentProductId:null,
    
    };
  }


  componentDidMount() {
    fetch('http://shehab-gamal334.serv00.net:38837/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: "{ getCategories { name } }",
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          categories: data.data.getCategories,
        })
      )
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }

  
  handleCategorySelect = (category) => {
    this.setState({ activeCategory: category });
  };

  toggleCart = () => {
    this.setState({ isCartOpen: !this.state.isCartOpen });
  };
  toggleProduct=(currentProductId)=>{
    this.setState({currentProductId})
  }
  toggleActive=()=>{
    this.setState({active:true})
  }
  render() {
    
    return (
      <>
       <Router>
        <Header
          categories={this.state.categories}
          activeCategory={this.state.activeCategory}
          onCategorySelect={this.handleCategorySelect}
          cartItemsCount={this.state.cartItems.length}
          onCartOpen={this.toggleCart}
          isCartOpen={this.state.isCartOpen}
      
        />
          <Routes>

<Route path="/" element={<ProductListingPage activeCategory={this.state.activeCategory} 
                                                toggleProduct={this.toggleProduct} 
                                                isCartOpen={this.state.isCartOpen}/>}/>
<Route path="/clothes" element={<ProductListingPage activeCategory={this.state.activeCategory} 
                                                toggleProduct={this.toggleProduct} 
                                                isCartOpen={this.state.isCartOpen}/>}/>
<Route path="/tech" element={<ProductListingPage activeCategory={this.state.activeCategory} 
                                                toggleProduct={this.toggleProduct} 
                                                isCartOpen={this.state.isCartOpen}/>}/>
<Route path={`${this.state.activeCategory==='all'?'':'/:category'}/product/:id`} element={<ProductDetailsPage currentProductId={this.state.currentProductId}
                                                        isCartOpen={this.state.isCartOpen}
                                                        />}/>

</Routes>
      
        </Router>
      </>
    );
  }
}

export default App;
