import React,{ Component } from 'react';
import { connect } from 'react-redux';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import Aux from './../../hoc/Auxilary/Auxilary';
import axios from './../../axios-orders';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import * as actions from './../../store/actions/index'

class BurgerBuilder extends Component{
    state={
        purchasing:false
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
    }

    updatePuchaseState = (ingredients) =>{ 
        const sum=Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey]; 
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);
        return sum > 0;
    }

    purchaseHandle =() =>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler =()=>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = ()=>{
       this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo={
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key] <=0;
        }
        let orderSummary =null;
        
        let burger=this.props.error ? <p>Ingredient can't be loaded</p>:<Spinner/>

        if(this.props.ings){
            burger=(
                <Aux>
                  <Burger ingredients={this.props.ings}/>
                <BuildControls 
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemoved={this.props.onIngredientRemoved}
                disabled={disabledInfo}
                purchaseable={this.updatePuchaseState(this.props.ings)}
                price={this.props.price}
                ordered={this.purchaseHandle}/>
                </Aux>
            );

                orderSummary = <OrderSummary 
                price={this.props.price}
                ingredients={this.props.ings}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                />;
        }
        return(
            <Aux>
               <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
               </Modal>
              {burger};
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
       ings: state.burgerBuilder.ingredients,
       price: state.burgerBuilder.totalPrice,
       error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
       onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
       onIngredientRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),
       onInitIngredients : () => dispatch(actions.initIngredients()),
       onInitPurchase : () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));