import { login, logout } from './slices/userSlice';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const listenToAuthChanges = (dispatch, setLoading) => {

  onAuthStateChanged(auth, async (user) => {
      if (user) {

          const userRef = doc(db, 'users', user.uid);
          const userSnapshot = await getDoc(userRef);
          const userData = userSnapshot.data();
          const lastSeen = userData.lastSeen.toMillis();

          dispatch(login({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoUrl: user.photoURL,
              ...userData,
              lastSeen: lastSeen
          }));
      } else {
          dispatch(logout());
      }
    if (setLoading) setLoading(false);
  });
};