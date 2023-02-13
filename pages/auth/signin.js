import {getProviders, signIn} from "next-auth/react"
import Image from "next/image";

export default function siginin({providers}){
    return (
    <div className="flex justify-center mt-20 space-x-4">
        <div className="felx justify-center mt-20 space-x-4">
                <Image src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch12findphone.png.twImage.1920.png"
                    alt="twitter image inside a phone" 
                    className=" hidden object-cover md:first-letter:w-44 md:h-80 rotate-6 md:inline-flex"/>
            </div>
            <div className="">
                {Object.values(providers).map((provider) => (
                    <div className="flex flex-col items-center">
                        <Image src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png" 
                        className="w-36 object-cover "
                        alt="twitter logo" />
                        <p className="text-center text-sm italic my-10 " >This app is created for learning purposes</p>
                        <button 
                            onClick={()=>signIn(provider.id, {callbackUrl: "/"})} 
                            className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500">Sign in with {provider.name}
                        </button>
                    </div>
                ))}
        </div>

    </div>
    )
}


export async function getServerSideProps(){
    const providers = await getProviders();
    return {
        props: {
            providers,
        },
    };
}