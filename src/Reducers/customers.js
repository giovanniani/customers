import { handleActions } from 'redux-actions';
import { FETCH_CUSTOMERS, 
        INSERT_CUSTOMER, 
        UPDATE_CUSTOMER, 
        DELETE_CUSTOMER } from '../Constants';

export const customers = handleActions({ 
    [FETCH_CUSTOMERS]: (state, action) => [...action.payload],
    [INSERT_CUSTOMER]: (state, action) => [...state, action.payload], //esta aprte inserta un nuevo cliente sobre los que ya estaban
    //para no tener que hacer fetch de los cliente y reducir el consumo de ancho de banda
    [UPDATE_CUSTOMER]: (state, action) => {
        const customerPayload = action.payload;
        const { id } = customerPayload;
        const customers = state;
        const initialValue = [];
        //la siguiente en una funcion de ES6 que reemplaza al cliente con el mismo id del antiguo con los datos nuevos
        //evitando tener que hacer el fetch a la base de datos
        const newCustomers = customers.reduce((acc, customer) =>{
            if(customer.id === id){
                return [...acc, customerPayload];
            }
            else{
                return [...acc, customer]
            }
        }, initialValue);
        return newCustomers;
    },
    [DELETE_CUSTOMER]: (state, action) => state.filter(c => c.id !== action.payload)
},[]);