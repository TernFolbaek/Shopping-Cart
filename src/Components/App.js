import { useState, useEffect } from 'react';
import Home from './Home.js';
import Shop from './Shop.js';
import Checkout from './Checkout.js';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.js';
import SignIn from './SignIn.js';

const App = () => {
  //array of object items, accumulate the price of the items
  const [cart, setCart] = useState([]);

  const handleCart = (item) => {
    setCart((cart) => [...cart, { src: item.src, price: item.price }]);
  };

  const handleCheckout = (operator, item) => {
    if (operator === 'plus') {
      setCart((cart) => [...cart, item]);
    } else if (operator === 'minus') {
      const otherItems = cart.filter((value) => value.src !== item.src);
      const existingItems = cart.filter((value) => value.src === item.src);
      existingItems.pop();
      setCart([...otherItems, ...existingItems]);
    }

    return;
  };

  return (
    <div>
      <Navbar totalItems={cart.length} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop handleCart={handleCart} />} />
        <Route
          path='/checkout'
          element={<Checkout items={cart} handleCheckout={handleCheckout} />}
        />
        <Route path='/signIn' element={<SignIn/>}/>
      </Routes>
    </div>
  );
};

export default App;
