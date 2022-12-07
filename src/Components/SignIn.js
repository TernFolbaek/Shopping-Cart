import { GoogleButton } from 'react-google-button';
import { useState, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';



// Signs-out of Friendly Chat.
function signOutUser() {
  // Sign out of Firebase.
  signOut(getAuth());
}

const SignIn = () => {

  const [load, setLoad] = useState(false)
  async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    let provider = new GoogleAuthProvider();
    console.log('in sign in function');
    await signInWithRedirect(getAuth(), provider);
  }


  return (
    <div className='sign-in'>
      {!!getAuth().currentUser ? (
        <div>
          <h1>Already Signed In</h1>
        </div>
      ) : (
        <div className='sign-in'>
          <h1>Sign In:</h1>
          <GoogleButton onClick={signIn} />
        </div>
      )}
    </div>
  );
};

export default SignIn;
