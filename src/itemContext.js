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
    //state for holding whole object when add to cart is clicked
    const [cart, setCart] = useState([]); //cart is holding empty array initially 

    //logic of manipulating the state

    //i want info of whole object i.e name,price,id so we have use prod as variable name

    //loop over item then we will match ids whatever item  is present in cart that item id and the item that is coming from add button if that matches then index will be set to the ids of that item
    //findIndex wil return -1 if item is not present in the array and it will return index number of that item if it is present
    const handleAdd = (prod) => {  //using cart array and looping over each element in cart array and will find index
        const index = cart.findIndex((item)=> item.id === prod.id); //index will be set to ids of that item, if item no. is 2 then index will be set to 3
        console.log(prod);
        //if item is not present in cart then index will be set to -1
        if(index === -1){
            //item not present in cart array
            setCart([...cart,{...prod, qty:1}]); //first the items which are already present in array that will come using spread operator then i will add new item which is being clicked i.e an object ,,spread all things that prod have and give new key qty as 1;
            console.log(cart);
            setTotal(total + prod.price); //whatever product is being clicked i want that price as prod is having all the keys  
        }
        //if item is already present in array then it will return index number of that item--
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
        const index = cart.findIndex((item) => item.id === id); //checking index if item is present in list item or not
        //if item is not present we will leave that condition as now we are removing

        //if item is present in the list it is decresing the quantity
        if(index !== -1){
          cart[index].qty--; //whatever the quantity of cart is we are doing -1 quantity
          setItem(item-1);
          setTotal(total - cart[index].price);

          //if quantity is already 0 we will make array empty (if shoes quantity is 0 then i dont want to show it on screen)
          if(cart[index].price ===0){
            //splice function deletes whatever is there on that particular index number
            cart.splice(index,1); //want to delete current index by 1 time
          }
          setCart(cart); //setting cart to cart that is empty array
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
            {showCart && <CartModal  />}
            {children}
        </itemContext.Provider>
    )
}

export {useValue};
export default CustomItemContext;