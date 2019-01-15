import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeContainer from './Containers/HomeContainer';
import CustomersContainer from './Containers/CustomersContainer';
import CustomerContainer from './Containers/CustomerContainer';
import NewCustomerContainer from './Containers/NewCustomerContainer';
import './App.css';



class App extends Component {

  renderHome = () => <HomeContainer/>;

  renderCustomerContainer = () => <CustomerContainer/>;

  renderCustomerListContainer = () => <CustomersContainer/>;

  renderCustomerNewContainer = () => <h1>Customer New Container</h1>

  render() {
    return (  
      <Router>
        <div>
        <Route exact path="/" component={this.renderHome} />
          <Route exact path="/customers" component={this.renderCustomerListContainer} />
          <Switch>  
            <Route path="/customers/new" component={NewCustomerContainer}/>
            <Route path="/customer/:dni" 
              render={props => <CustomerContainer dni={props.match.params.dni}/>}/>
          </Switch>
        </div>        
      </Router>
    );
  }
}

export default App;
