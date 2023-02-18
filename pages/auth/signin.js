import { db } from "../../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
export default function Signin() {
  const router = useRouter();
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const user = auth.currentUser.providerData[0];
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          username: user.displayName.split(" ").join("").toLocaleLowerCase(),
          userImg: user.photoURL,
          uid: user.uid,
          timestamp: serverTimestamp(),
        });
      }
      router.push("https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?response_type=code&client_id=1017491681738-7be9o5ufeauoninddum92ao0p39869sd.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Ftwitter-v4-88045.firebaseapp.com%2F__%2Fauth%2Fhandler&state=AMbdmDmoMMJRd_JVsiY1rh0vdtQ4gB23CeFRzhKF8GYjRZlidpp2kV3rjiWJNl9gKQFS3TPTg3_HuH0UscuEMsATV_yX_hLxKwUHHhkvSGuX2s6RY8LKXN4hgvKxRy_LJDaYG1XtkKa1XBfx8eArKIIpGt9KZz02SKzUgOJajWLA2QBC_roHIKWrqBNqlq49tsEt8VOEApyQNxO8iy-PC9cGOXKdTUT3Vm2MQvBO2_xRJUFFHrbodCPJsAc8panVLxpsK7YVw4S1FXWrNHj17mPqSX5w2EssO6QVTLUueI-lZAsYZdmzRw05anT6jucvpTkB3F9zrVak6Dc&scope=openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20profile&context_uri=http%3A%2F%2Flocalhost%3A3001&service=lso&o2v=1&flowName=GeneralOAuthFlow");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center mt-20 space-x-4">
      <img
        src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch12findphone.png.twimg.1920.png"
        alt="twitter image inside a phone"
        className="hidden object-cover md:w-44 md:h-80 rotate-6  md:inline-flex"
      />
      <div className="">
        <div className="flex flex-col items-center">
          <img
            className="w-36 object-cover"
            src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
            alt="twitter logo"
          />
          <p className="text-center text-sm italic my-10">
            This app is created for learning purposes
          </p>
          <button
            onClick={onGoogleClick}
            className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}