import { useState, useEffect } from 'react';

const stock = [
  { src: 'beanie-1.jpeg', price: 12 },
  { src: 'beanie-2.jpeg', price: 8 },
  { src: 'beanie-3.jpeg', price: 15 },
  { src: 'beanie-4.jpeg', price: 20 },
  { src: 'beanie-6.jpeg', price: 18 },
];

const Shop = ({ handleCart }) => {
  const [parts, setParts] = useState(stock);

  return (
    <div className='image-container'>
      {parts.map((item) => (
        <div className='shop-item'
          key={Math.random()}
          onClick={() => {
            handleCart(item);
          }}
        >
          <img src={`./images/${item.src}`} alt='Beanie' />
          <h2 className='price'>$ {item.price}</h2>
        </div>
      ))}
    </div>
  );
};

export default Shop;
