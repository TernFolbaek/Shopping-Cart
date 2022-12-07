import { Link } from 'react-router-dom';

const Navbar = ({ totalItems }) => {
  return (
    <nav className='nav'>
      <div>
        <Link to='/' className='site-title'>
          Beanie-Nation
        </Link>
      </div>
      <ul className='links-container'>
        <Link to='/'>Home</Link>
        <Link to='/shop'>Shop</Link>
        <Link to='/checkout' className='cart-icon'>
          <h1>{totalItems}</h1>
          <img src='./images/pet-carrier.png' />
        </Link>
        <Link to='/signIn'>Sign In</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
