import { createAction } from 'redux-actions';
import { DELETE_CUSTOMER } from './../Constants';
import { apiDelete } from './../Api';
import { urlCustomers } from './../Api/urls';

export const deleteCustomer = createAction(DELETE_CUSTOMER, 
    (id) => apiDelete(urlCustomers, id)() );