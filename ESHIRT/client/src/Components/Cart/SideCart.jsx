import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import { useAuth0} from "@auth0/auth0-react";
import {NavLink} from 'react-router-dom';

import { 
    postOrder,
    putOrder,
    checkLastOrder,
    setCartItems 
} from '../../Actions/index';
import style from './SideCart.module.css'


export function SideCart(){ 
    let total= 0
    const dispatch= useDispatch()
    
    const items= useSelector(state => state.cartReducer.items)
    const cart = useSelector(state => state.cartReducer.items)
    const orderId = useSelector(state => state.ordersReducer.orderId)
    const {isAuthenticated} = useAuth0();

    const handleCartChange = (e, operation) => {
        e.preventDefault();
        const item = (e.target.id && items[parseInt(e.target.id)]) || {}
        dispatch(setCartItems({ 
            ...item, 
            amount: 1
        }, operation));
        if (isAuthenticated) {
            if (operation === '+') {
                operation = 'add'
            } else if (operation === '-') {
                operation = 'remove'
            }
            dispatch(putOrder([...cart, item], orderId, operation))
        } 
    }
    
    return (
        <div className={style.container}>
            <div className={style.items}>
                <h2>You have {items.reduce((a,c)=>a+c.amount,0)} items in your cart</h2>
                <button className={style.cartBtnC}  onClick={(e) => handleCartChange(e, 'clear')} >Clear cart</button>
                {items?.map((item, index)=> {
                    total += (item.price * item.amount)
                    return(
                        
                        <div className={style.item}>
                            <div className={style.data}>
                                <h4>{item.title}</h4>
                                <h4>{item.size}</h4>

                                U$S{item.price}x{item.amount}

                            </div>
                            <div className={style.ctrls}>
                            <img src={item.image}/>
                            <div className={style.amount}>
                                <button id= {index} onClick={(e) => handleCartChange(e, '+')}>+1</button>
                                <button id= {index} onClick={(e) => handleCartChange(e, '-')}>-1</button>
                            </div>
                            </div>

                        </div>
                    )
                    })
                } 
            </div>
            <div className={style.total}>
                TOTAL: U$S{total}
            </div>
            <NavLink to='/cart'>
                <button className={style.cartBtnP}>Proceed</button>
            </NavLink>
        </div>
    )
}