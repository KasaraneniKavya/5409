import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../utils/cognitoAuth";
import { Hub } from "aws-amplify";
import ChangePassword from "./auth/changePassword";
import ForgotPassword from "./auth/forgotPassword";
import GoogleSignIn from "./auth/googleSignIn";
import LogIn from "./auth/logIn";
import Register from "./auth/register";
import ResendVerificationCode from "./auth/resendVerificationCode";
import SignOut from "./auth/signOut";
import VerifyEmailWithCode from "./auth/verifyWithCode";
import VerifyForgotPassword from "./auth/verifyForgotPassword";

export default function AuthHub() {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
            Hub.listen("auth", ({ payload: { event, data } }) => {
                switch (event) {
                    case "signUp":
                        console.log("User registered");
                        break;
                    case "cognitoHostedUI":
                    case "signIn":
                        getCurrentUser()
                            .then((userData) => {
                                setCurrentUser(userData);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        break;
                    case "signOut":
                        setCurrentUser(null);
                        break;
                    case "signIn_failure":
                    case "cognitoHostedUI_failure":
                        console.log("Sign in failure", data);
                        break;
                    default:
                }
            });

            getCurrentUser()
                .then((userData) => setCurrentUser(userData))
                .catch((err) => console.log(err));
        }, []);
        
        // return (
        //     <div>
        //         <h1>Group42-Dal</h1>
        //         {!currentUser && (
        //             <>
        //                 <h2>You are not signed in.</h2>
                        
        //                 <LogIn />
        //                 <GoogleSignIn />
        //                 <Register />

                        
        //                 <ForgotPassword />
        //                 <VerifyForgotPassword />
        //             </>
        //         )}
        //         {currentUser && (
        //             <>
        //                 <h2>Hello {currentUser["email"]}</h2>
        //                 <SignOut />
        //             </>
        //         )}
    
        //         {(!currentUser || !currentUser.email_verified) && (
        //             <>
        //                 <VerifyEmailWithCode />
        //                 <ResendVerificationCode />
        //             </>
        //         )}
    
        //         {currentUser && !currentUser.identities && (
        //             <>
        //                 <ChangePassword />
        //             </>
        //         )}
        //     </div>
        // );
    }