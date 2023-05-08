import { fetchSignInMethodsForEmail, signInWithEmailAndPassword } from "firebase/auth"

// Check if user exists in database and set state accordingly
const checkForUser = (auth, userAuthAttempt, setUserAuthAttempt) => {
    fetchSignInMethodsForEmail(auth, userAuthAttempt.email)
    .then((signInMethods) => {
        if (signInMethods.length > 0) {
            setUserAuthAttempt({
                ...userAuthAttempt,
                exists: true,
                continued: true,
            })
        } else {
            setUserAuthAttempt({
                ...userAuthAttempt,
                exists: false,
                continued: true,
            })
        }
    })
}

export { checkForUser }