import { createContext,useState,useContext } from "react";
import CartModal from "./components/CartModal";

//creation of context
const itemContext = createContext();  

//extracting/consuming the value from this file only
function useValue(){
    const value = useContext(itemContext);
    //as it is customHook it will return some value so it will return value which i am getting from itemContext
    return value;
}

//providing the context //created the customProvider...   accesssing the children here
function CustomItemContext({ children }){
    const [total, setTotal] = useState(0);
    const [item, setItem] = useState(0);
    const [showCart, setShowCart] = useState(false);
    const [cart, setCart] = useState([]); //cart is holding empty array initially

    //logic of manipulating the state

    //loop over item then we will match ids whatever item  is present in cart that item id and the item that is coming from add button if that matches then index will be set to the ids of that item
    //findIndex wil return -1 if item is not present in the array and it will return index number of that item if it is present
    const handleAdd = (prod) => {  //using cart array and looping over each element in cart array and will find index
        const index = cart.findIndex((item)=> item.id === prod.id);
        console.log(prod);
        if(index === -1){
            //item not present in cart array
            setCart([...cart,{...prod, qty:1}]); //first the items which are already present in array that will come using spread operator then i will add new item which is being clicked i.e in object ,,spread all things that prod have and give new key qty as 1;
            console.log(cart);
            setTotal(total + prod.price); //whatever product is being clicked i want that price
        }
        //if item is already present in array then how will cart be set--
        else{
            cart[index].qty++; //at whatever index no. that item is present,at that index no. i am increasing the qty by one(of that index item)
            setCart(cart);
            console.log(cart);
            setTotal(total+cart[index].price); //increase whatever total getting from cart
        }
        //increasing set item
        setItem(item+1);

      };
    
      const handleRemove = (id) => {
        const index = cart.findIndex((item) => item.id === id);

        if(index !== -1){
          cart[index].qty--;
          setItem(item-1);
          setTotal(total - cart[index].price);
          if(cart[index].price ===0){
            cart.splice(index,1);
          }
          setCart(cart);
        }
      };

      const clear = ()=>{
        setTotal(0);
        setItem(0);
        setCart([]);
      }

      const toggle =() =>{
        setShowCart(!showCart);
      }

    return (
        //CustomProvider making use of  default provider here ,making use of children
        <itemContext.Provider value ={
            {total,item,handleAdd,handleRemove,clear,toggle,cart}   //passing the values to access in other components
        }>
            {showCart && <CartModal toggle={toggle}/>}
            {children}
        </itemContext.Provider>
    )
}

export {useValue};
export default CustomItemContext;