import { Routes, Route, Outlet, useNavigate, Navigate, BrowserRouter } from "react-router-dom";
import {
    ChangePassword,
    ForgotPassword,
    GoogleSignIn,
    LogIn,
    Register,
    ResendVerificationCode,
    SignOut,
    VerifyEmailWithCode,
    VerifyForgotPassword,
} from "../components/auth";




const AppRoutes= () => {
    return (
        <BrowserRouter>
        <div>
            <Routes>
              <Route exact path="/" element={<LogIn />}/>
              <Route path="/register" element={<Register />}/>
              <Route path="/signout" element={<SignOut />}/>
              <Route path="/forgotpassword" element={<ForgotPassword />}/>
              <Route path="/changepassword" element= {<ChangePassword />}/>
              <Route path="/verifyemail" element= {<VerifyEmailWithCode />}/>
              <Route path="/forgotpasswordcode" element= {<VerifyForgotPassword />}/>
              <Route path="/googlesignin" element= {<GoogleSignIn />}/>
              <Route path="/resendcode" element= {<ResendVerificationCode />}/>
            </Routes>
        </div>
    </BrowserRouter>
          );
}

export default AppRoutes;