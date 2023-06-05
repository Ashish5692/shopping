import { createContext,useState,useContext } from "react";

//creation of context
const itemContext = createContext();  

//extracting/consuming the value from this file only
function useValue(){
    const value = useContext(itemContext);
    //as it is customHook it will return some value so it will return value which i am getting from itemContext
    return value;
}

//providing the context //created the customProvider...   accesssing the children here
function CustomItemContext({children}){
    const [total, setTotal] = useState(0);
    const [item, setItem] = useState(0);

    //logic of manipulating the state
    const handleAdd = (price) => {
        setTotal(total+price);
        setItem(item+1);
      };
    
      const handleRemove = (price) => {
        if(total <=0){
          return;
        }
        setTotal((prevState)=> prevState-price);
        // setTotal(total-price)
        setItem(item-1);
      };

      const clear = ()=>{
        setTotal(0);
        setItem(0);
      }

    return (
        //CustomProvider making use of  default provider here ,making use of children
        <itemContext.Provider value ={
            {total,item,handleAdd,handleRemove,clear}   //passing the values to access in other components
        }>
            {children}
        </itemContext.Provider>
    )
}

export {itemContext,useValue};
export default CustomItemContext;