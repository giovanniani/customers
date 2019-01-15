 import { createAction } from 'redux-actions';
import { INSERT_CUSTOMER } from '../Constants/';
import { apiPost } from './../Api';
import { urlCustomers } from './../Api/urls';

export const insertCustomer = createAction(INSERT_CUSTOMER, 
    customer => apiPost(urlCustomers, customer)() );