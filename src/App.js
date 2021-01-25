import './App.css';
import HomePage from './Containers/HomePage';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProductListPage from './Containers/ProductListPage';
import { useDispatch, useSelector } from 'react-redux';
import { authReducer } from './reducers/auth.reducer';
import { isUserLoggedIn } from './actions/auth.action';
import ProductDetailsPage from './Containers/ProductDetailsPage';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(()=>{
    if(auth.authenticate){
      dispatch(isUserLoggedIn())
    }
  },[auth.authenticate])
 
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route exact path='/:slug' component={ProductListPage} />
          <Route exact path="/:productSlug/:productId/p" component={ProductDetailsPage} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
