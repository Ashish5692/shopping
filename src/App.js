import './App.css';
import { useState } from 'react';
import Items from './components/Items';
import Navbar from './components/Navbar';
import CustomItemContext, { itemContext } from './itemContext';


function App() {
  
  return (
    //custom Provider acting as provider here
      <CustomItemContext>
        <div className='App'>
          <h2>Shopping Cart</h2>
            <Navbar />
            <Items />
        </div>
      </CustomItemContext> 
        
  );
}
export default App;
