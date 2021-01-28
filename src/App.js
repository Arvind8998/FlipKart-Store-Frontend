import './App.css';
import HomePage from './Containers/HomePage';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProductListPage from './Containers/ProductListPage';
import { useDispatch, useSelector } from 'react-redux';
import { authReducer } from './reducers/auth.reducer';
import { isUserLoggedIn } from './actions/auth.action';
import ProductDetailsPage from './Containers/ProductDetailsPage';
import { useEffect } from 'react';
import CartPage from './Containers/CartPage';
import { updateCart } from './actions/cart.action';

function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(()=>{
    if(auth.authenticate){
      dispatch(isUserLoggedIn())
    }
  },[auth.authenticate])

  useEffect(()=>{
    dispatch(updateCart())
  },[])
 
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/cart' component={CartPage} />
          <Route path="/:productSlug/:productId/p" component={ProductDetailsPage} />
          <Route path='/:slug' component={ProductListPage} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
