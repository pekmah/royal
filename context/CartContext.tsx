"use client"
import React, {useContext, createContext, useState, useReducer, useEffect, ReactNode} from 'react'
import  toast  from 'react-hot-toast'

type Action = {
    type: string;
    payload: any; 
  };
  interface CartType {
    items: Array<CartItem>; 
  }
  
  interface CartItem {
    id: number;
    name: string;
  }

  interface CartContextValue {
    handleSidebar: () => void;
    cart: {
      items: CartItem[]; // Use the actual type for cart items
    };
    sidebar: boolean;
    
    addToCart: (item: CartItem, id: number) => void;
    itemQuantity:number
    // Add more functions or properties as needed
  }
  const GlobalContext = createContext<CartContextValue>({} as CartContextValue);

export const ACTION = {
  ADD_TO_CART : 'addToCart',
//   REMOVE_FROM_CART: 'removeFromCart',
//   INCREASE_QUANTITY: 'increaseQuantity',
//   DECREASE_QUANTITY: 'decreaseQuantity',
//   REMOVE_ALL: 'removeAll',

}
const reducer = (cart: CartType, action: Action) => {
  switch(action.type){
    case ACTION.ADD_TO_CART: {
      // let newCart = {...cart, items:[...cart.items, {...action.payload, qty: 1}]}
      let inCart = false;
      const updatedCart = cart.items.map((item:any)=>{
        
        if (item.id === action.payload.id){
          inCart = true
          // toast.success(`Item QTY Increased`)
          return {...item, qty:item.qty+1}
          }
          return item
          
        })
        if(!inCart){
          updatedCart.push({...action.payload, qty: 1})
        }
      return {...cart, items:updatedCart}
    }
    // case ACTION.REMOVE_FROM_CART:{
      
    //   // console.log(cart.items)
    //   return {...cart, items:cart.items.filter((item)=> item.id !== action.payload.id)}
     
    // }
    // case ACTION.INCREASE_QUANTITY:{
    //   return {...cart, items:cart.items.filter((item)=>{
    //     if (item.id === action.payload.id){
    //       toast.success(`Item QTY Increased`)
    //       return({...item, qty:item.qty += 1})
          
    //     }
    //     return item
    //   })}
    // }
    // case ACTION.DECREASE_QUANTITY:{
    //   return {...cart, items:cart.items.filter((item)=>{
    //     if (item.id === action.payload.id){
    //       // console.log(item.qty)
    //       if (item.qty > 1){
    //         toast.success(`Item QTY Decreased`)
    //         return {...item, qty:item.qty -= 1}
            
    //       }
    //       return item
    //     }
    //     return item
    //   })}

    // }
    // case ACTION.REMOVE_ALL:{
    //   toast.success(`Cart Cleared`)
    //   return {cart, items: []}
    // }
    // case ACTION.TOTAL_ITEMS:{
    //   const total = 
    // }
    default:
      return cart
  }
}
// const newCart = (cart) =>{
//   return {cart: cart, qty:+1}
// }
const CartContextProvider = ({children}:{children:ReactNode}) => {
    const [sidebar, setSidebar] = useState(false)
    const [cart, dispatch] = useReducer(reducer, {items: []})
    // item quantity toatal
    const [itemQuantity, setItemQuantity] = useState(0)
    // Total cart price
    const [totalPrice, setTotalPrice] = useState(0)
    const handleSidebar = () =>{
        setSidebar(!sidebar)
    }
    // Total Quanity
    useEffect(()=>{
      const total = cart.items.reduce((accumulator:any, currentIndex)=>
        accumulator+ currentIndex.qty
        , 0)
      setItemQuantity(total)
    }, [cart])
    // Total cart Price
    // useEffect (() =>{
    //   const total = cart.items.reduce((accumulator, currentIndex)=>
    //   accumulator + currentIndex.qty * currentIndex.price , 0)
    //   setTotalPrice(total)
    // }, [cart])
   
    const addToCart = (item:CartItem, id:number) =>{
      const inCart = cart.items.find((item)=>item.id === id)
      if (inCart){
        toast.success(`Item QTY Increased`)
      }
      else{
        toast.success(`${item.name} added to Cart`)
      }
      dispatch({type:ACTION.ADD_TO_CART, payload:item})
    }
 
    // const removeFromCart = (id, title) =>{
    //   toast.success(`${title} added to Cart`)
    //   dispatch({type:ACTION.REMOVE_FROM_CART, payload:{id : id }})
    // }
    // const increaseQuantity = (id) =>{
    //   dispatch({type:ACTION.INCREASE_QUANTITY, payload:{id:id}})
    // }
    // const decreaseQuantity = (id) =>{
    //   dispatch({type:ACTION.DECREASE_QUANTITY, payload:{id:id}})
      
    // }
    // const removeAll =() =>{
    //   dispatch({type:ACTION.REMOVE_ALL})
    // }
  return (
    <GlobalContext.Provider value = {{
          handleSidebar,
          sidebar,
          cart,
          addToCart,
          itemQuantity
               }}>
        {children}
    </GlobalContext.Provider>
  )
}
export const useCartContext = () =>{
    return useContext(GlobalContext)
}
export default CartContextProvider