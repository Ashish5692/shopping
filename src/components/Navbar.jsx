import React from "react";
import styles from "../styles/Total.module.css";
import { useValue } from "../itemContext";

function Navbar() {

    const {item,cart,total} = useValue();
    console.log(cart);
  return (
    <div className={styles.container}>
      <h1>Total : &#x20B9; {total}</h1>
      <h1>Items: {item}</h1>   
    </div>
  );
}

export default Navbar;
