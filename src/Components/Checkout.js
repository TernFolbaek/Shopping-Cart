import { Link } from 'react-router-dom';

const totalPrice = (items) => {
  let price = 0;
  items.forEach((item) => {
    price += item.price;
  });

  return price;
};

const getOccurrence = (array, value) => {
  return array.filter((v) => v.src === value).length;
};

const conditionalDom = (items, handleCheckout) => {
  if (items.length <= 0) {
    return (
      <h1 className='checkout-message'>You have yet to select any items</h1>
    );
  } else {
    const uniqueArray = items.filter((value, index) => {
      const _value = JSON.stringify(value);
      return (
        index ===
        items.findIndex((obj) => {
          return JSON.stringify(obj) === _value;
        })
      );
    });

    return uniqueArray.map((item) => {
      return (
        <div className='flex-column' key={Math.random()} >
          <img className='checkout-images' src={`./images/${item.src}`} />
          <div className='button-group'>
            <button
              onClick={() => {
                handleCheckout('plus', item);
              }}
            >
              +
            </button>
            <p>{getOccurrence(items, item.src)}</p>
            <button
              onClick={() => {
                handleCheckout('minus', item);
              }}
            >
              -
            </button>
          </div>
        </div>
      );
    });
  }
};

const handlePurchase = () => {
  alert('robert looking kinda cute');
};
const Checkout = ({ items, handleCheckout }) => {
  let price = totalPrice(items);

  return (
    <div>
      <div>
        <div className='flex'>{conditionalDom(items, handleCheckout)}</div>
      </div>

      <div className='checkout-footer'>
        <Link className='flex-1' to='/shop'>
          Back
        </Link>
        <div className='flex-1'>
          <h1>Total cost: $ {price}</h1>
        </div>
        <button className='flex-1' onClick={handlePurchase}>
          Complete Purchase
        </button>
      </div>
    </div>
  );
};

export default Checkout;
