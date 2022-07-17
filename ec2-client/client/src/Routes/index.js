import { Routes, Route, Outlet, useNavigate, Navigate, BrowserRouter } from "react-router-dom";
import {
    ChangePassword,
    ForgotPassword,
    GoogleSignIn,
    LogIn,
    Profile,
    Home,
    NavBar,
    History,
    Register,
    ResendVerificationCode,
    SignOut,
    VerifyEmailWithCode,
    VerifyForgotPassword,
} from "../components/auth";
import FileUpload from "../components/fileUpload";
import AuthHub from "../components/authHub";
import GetUsers from "../components/getUsers";



const AppRoutes = () => {

    // return (
    //     <BrowserRouter>
    //         <div>
    //             <Routes>
    //                 <Route exact path="/" element={<LogIn />} />
    //                 <Route path="/register" element={<Register />} />
    //                 <Route path="/signout" element={<SignOut />} />
    //                 <Route path="/forgotpassword" element={<ForgotPassword />} />
    //                 <Route path="/changepassword" element={<ChangePassword />} />
    //                 <Route path="/verifyemail" element={<VerifyEmailWithCode />} />
    //                 <Route path="/forgotpasswordcode" element={<VerifyForgotPassword />} />
    //                 <Route path="/googlesignin" element={<GoogleSignIn />} />
    //                 <Route path="/resendcode" element={<ResendVerificationCode />} />
    //                 <Route path="/profile" element={<Profile />} />
    //                 <Route path="/home" element={<Home />} />
    //                 <Route path="/history" element={<History />} />
    //                 <Route path="/uploadtest" element={<FileUpload />} />
    //                 <Route path="/admin" element={<div><AuthHub /><GetUsers /></div>} />
    //             </Routes>
    //         </div>
    //     </BrowserRouter>
    // );

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<WithoutNavbar />}>
                    <Route path="/" element={<LogIn />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/verifyemail" element={<VerifyEmailWithCode />} />
                    <Route path="/forgotpasswordcode" element={<VerifyForgotPassword />} />
                    <Route path="/googlesignin" element={<GoogleSignIn />} />
                    <Route path="/resendcode" element={<ResendVerificationCode />} />
                    <Route path="/signout" element={<SignOut />} />
                </Route>
                <Route
                    path="*"
                    element={
                        <RequireAuth>
                            <ProtectedRoutes />
                        </RequireAuth>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

const ProtectedRoutes = () => {
    return (
        <Routes>
            <Route element={<WithNavbar />}>
                <Route path="/changepassword" element={<ChangePassword />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/home" element={<Home />} />
                <Route path="/history" element={<History />} />
                <Route path="/uploadtest" element={<FileUpload />} />
                <Route path="/admin" element={<div><AuthHub /><GetUsers /></div>} />
            </Route>
        </Routes>
    );
};

const RequireAuth = ({ children }) => {
    const userEmail = localStorage.getItem("USER_EMAIL");
    console.log(userEmail);
    if (!userEmail) {
        return <Navigate to="/" replace />;
    }
    return children;
};

const WithNavbar = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};

const WithoutNavbar = () => <Outlet />;



export default AppRoutes;