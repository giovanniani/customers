import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppFrame from './../components/AppFrame';
import { getCustomerByDni } from '../Selectors/customers';
import { Route, withRouter } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import CustomerEdit from './../components/CustomerEdit';
import CustomerData from './../components/CustomerData';
import { fetchCustomers } from './../Actions/fetchCustomers';
import { updateCustomer } from './../Actions/updateCustomer';
import { deleteCustomer } from './../Actions/deleteCustomer';


//body={<p>Datos del cliente  "{this.props.customer.name}"</p>}>


class CustomerContainer extends Component {

    componentDidMount()
    {   
        if(!this.props.customer)
        {
            this.props.fetchCustomers();
        }
    }

    handleSubmit = values => {
        const { id } = values; 
        return this.props.updateCustomer(id, values)
              .then(v => v)
              .catch(err => {
                if(err.error) {
                  throw new SubmissionError(err.payload);
                }
              });
  }

    handleOnBack = () => { 
        this.props.history.goBack();
    }

    handleOnSubmitSuccess = () =>{
        this.props.history.goBack();
    }

    handleOnDelete = id => {
        console.log("Handle On Delete");
        this.props.deleteCustomer(id).then(v => {
            this.props.history.goBack();
        });
    }

    renderCustomerControl = (isEdit, isDelete) => {
    if(this.props.customer) //por si customer viene vacio para que recargue la pagina
            {
                const CustomerPage = isEdit ? CustomerEdit : CustomerData; //esto me permite cambiar el tipo de componente dinamicamente
                //return <CustomerPage initialValues = {this.props.customer}/>  //esto permite pasar al customer de manera mas facil, 
                //la propiedad initialValues es propia de redux forms, asi se debe llamar, se utilizara otro metodo
                //del return para ver varias maneras de hacerlo
                return <CustomerPage 
                    {...this.props.customer}                         
                    onSubmit={this.handleSubmit}
                    onSubmitSuccess={this.handleOnSubmitSuccess}
                    onBack={this.handleOnBack}
                    isDeleteAllow={!!isDelete}
                    onDelete={this.handleOnDelete}/>
            }
            return null;
    }

    renderBody = () => 
    (
        <Route path="/customer/:dni/edit" children =
        {( 
            { match: isEdit } ) => (
                <Route path="/customer/:dni/del" children =
                {(
                    { match: isDelete }) => ( this.renderCustomerControl(isEdit, isDelete))
                }/>            
            )
        }/>
    )

    render() {
        return (
            <div>
                <AppFrame header={`Cliente ${this.props.dni}`}                
                body={this.renderBody()}>
                </AppFrame>
            </div>
        );
    }
}

CustomerContainer.propTypes = {
    dni: PropTypes.string.isRequired,
    customer: PropTypes.object,
    fetchCustomers: PropTypes.func.isRequired,
    updateCustomer: PropTypes.func.isRequired,
    deleteCustomer:PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) =>({
   customer: getCustomerByDni(state, props)
});

export default withRouter(connect(mapStateToProps,{
    fetchCustomers,
    updateCustomer,
    deleteCustomer
    })(CustomerContainer));