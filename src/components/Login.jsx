import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase.init";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState(null);
  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleToGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const loggedInUser = result.user;
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      });
  };

  return (
    <div>
      {console.log(user)}
      <h1>Login Please</h1>
      {user && (
        <div>
          <img src={user.photoURL} />
          <div>Name: {user.displayName}</div>
          <div>Email: {user.email}</div>
        </div>
      )}
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleToGoogleSignIn}>Login by Google</button>
      )}
    </div>
  );
};

export default Login;
