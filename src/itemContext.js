import { createContext,useState } from "react";

const itemContext = createContext();

function CustomItemContext({children}){
    const [total, setTotal] = useState(0);
    const [item, setItem] = useState(0);
    return (
        //CustomProvider making use of default provider here
        <itemContext.Provider value ={
            {total,setTotal,item,setItem}
        }>
            {children}
        </itemContext.Provider>
    )
}

export {itemContext};
export default CustomItemContext;