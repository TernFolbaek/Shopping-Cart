import { useState } from 'react';
import Home from './Home.js';
import Shop from './Shop.js';
import Checkout from './Checkout.js';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.js';
import SignIn from './SignIn.js';
import { db } from '../index.js';
import { getAuth } from 'firebase/auth';
import {
  collection,
  addDoc,
  query,
  doc,
  getDocs,
  where,
  deleteDoc,
} from 'firebase/firestore';
import { getUserName } from './SignIn.js';

const App = () => {
  //array of object items, accumulate the price of the items
  const [cart, setCart] = useState([]);

  async function check() {
    console.log('in check');
    if (!!getAuth().currentUser && cart.length === 0) {
      console.log('in check, user logged in');
      const itemsRef = collection(db, `${getUserName()}`);
      const q = query(itemsRef);

      const querySnapshot = await getDocs(q);
      let items = [];
      querySnapshot.forEach((doc) => {
        let obj = {
          src: doc.data().src,
          price: doc.data().price,
        };
        items.push(obj);
      });
      setCart((cart) => [...cart, ...items]);
    } else {
      console.log('in check, user NOT logged in');

      return;
    }
  }

  const handleCart = (item) => {
    console.log('handle cart');
    saveItem(item);
    setCart((cart) => [...cart, { src: item.src, price: item.price }]);
  };

  async function handleCheckout(operator, item) {
    if (operator === 'plus') {
      setCart((cart) => [...cart, item]);
    } else if (operator === 'minus') {
      const colRef = collection(db, `${getUserName()}`);

      // Create a query against the collection.
      console.log(item.src);
      const q = query(colRef, where('src', '==', item.src));
      const querySnapshot = await getDocs(q);
      let removeItems = [];
      querySnapshot.forEach((doc) => {
        let obj = {
          src: doc.data().src,
          price: doc.data().price,
          id: doc.id,
        };
        removeItems.push(obj);
      });

      await deleteDoc(doc(db, `${getUserName()}`, removeItems[0].id));

      const otherItems = cart.filter((value) => value.src !== item.src);
      const existingItems = cart.filter((value) => value.src === item.src);
      existingItems.pop();
      setCart([...otherItems, ...existingItems]);
    }

    return;
  }

  async function saveItem(item) {
    let userName = getUserName();

    try {
      await addDoc(collection(db, `${userName}`), {
        src: item.src,
        price: item.price,
      });
    } catch (error) {
      console.error('Error writing new message to Firebase Database', error);
    }
  }

  return (
    <div>
      <Navbar check={check} totalItems={cart.length} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop handleCart={handleCart} />} />
        <Route
          path='/checkout'
          element={<Checkout items={cart} handleCheckout={handleCheckout} />}
        />
        <Route path='/signIn' element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default App;
