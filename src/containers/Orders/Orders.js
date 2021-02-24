import React,{Component} from 'react'
import Order from './../../components/Order/Order';
import axios from './../../axios-orders'
import * as actions from './../../store/actions/index';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
    state={
        orders : [],
        loading : true
    }

    componentDidMount(){
       
    }
    render(){
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}/>
                ))}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders : () => dispatch(actions.fetchOrders())
    }
}

export default withErrorHandler(Orders,axios);