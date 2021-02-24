import * as actionTypes from './actionTypes';
import axios from './../../axios-orders'; 

export const PurcshaseBurgerSuccess = (id,orderData) => {
   return{
      type:actionTypes.PURCHASE_BURGER_SUCCESS,
      orderId: id,
      orderData : orderData
   }
}

export const purchaseBurgerFail = (error) => {
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurgerStart = () => {
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post( '/orders.json', orderData )
            .then( response => {
                dispatch(PurcshaseBurgerSuccess(response.data.name,orderData))
            } )
            .catch( error => {
                dispatch(purchaseBurgerFail(error))
            } );
    }
}

export const purchaseInit = () => {
    return{
        type:actionTypes.PURCHASE_INIT
    }
}


export const fetchOrderSuccess = (orders) => {
    return{
        type : actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}

export const fetchOrderFail = (error) => {
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const fetchOrderStart = () => {
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const fetchOrders = () => {
    return dispatch => {
        axios.get('/orders.json')
        .then(res => {
            const fatchOrders = [];
            for(let key in res.data){
                fatchOrders.push({
                    ...res.data[key],
                    id : key
                });
            }
            dispatch(fetchOrderSuccess(fatchOrders))
        })
        .catch(err => {
            dispatch(fetchOrderFail(err));
        })
    };
}