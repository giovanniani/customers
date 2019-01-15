import { FETCH_CUSTOMERS } from "./../Constants";
import { createAction } from 'redux-actions';
import { apiGet } from './../Api';
import { urlCustomers } from "../Api/urls";

export const fetchCustomers = createAction(FETCH_CUSTOMERS, apiGet(urlCustomers));