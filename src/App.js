import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/logination/login";
import { RegisterPage } from "./pages/register";
import { HomePage } from "./pages/homepage";
// import { Carousel } from "./components/carousel";
import { ProfilePage } from "./pages/profile";
import { NavbarPage } from "./pages/navbar";
import { CreateBlog } from "./pages/createBlog";
import { ResetPsw } from "./pages/passwordSchema/newPassword";
import { ForgotPsw } from "./pages/passwordSchema/pswForgot";
import { SearchResult } from "./pages/searchResult";
import { Validation } from "./pages/verification";
import { PhoneLogin } from "./pages/logination/phoneLogin";
import { UserLogin } from "./pages/logination/userlogin";
import { useDispatch } from "react-redux";
import  Axios  from "axios";
import { setValue } from "./redux/userSlice";
import { useEffect } from "react";
import { Verify } from "./pages/passwordSchema/reset-password";
import { EditProfile } from "./components/editProfile/profileDetail";
import { DetailPage } from "./pages/detailPage";
import { MyBlog } from "./components/myBlog";
import { ViewLike } from "./components/Like/viewLike";
import { SideNavbar } from "./components/sideNavbar";

const router = createBrowserRouter([
  { path: "/", 
    element: <NavbarPage/>,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/profile", element: <ProfilePage/> },
      { path: "/createBlog", element: <CreateBlog/> },
      { path: "/searchResult", element: <SearchResult/> },      
      { path: "/detailPage/:id", element: <DetailPage/> },
      { path: "/viewLike", element: <ViewLike/> },
      { path: "/sideNavbar", element: <SideNavbar/> },


    ]
  },
  
  { path: "/register", element: <RegisterPage/> },
  { path: "/verification/:token", element: <Validation/> },
  { path: "/verification-change-email/:token", element: <Validation/> },
  { path: "/login", element: <LoginPage/> },
  { path: "/userLogin", element: <UserLogin/> },
  {path: "/phoneLogin", element: <PhoneLogin/> },
  { path: "/reset-password/:token", element: <ResetPsw/> },
  { path: "/pswForgot", element: <ForgotPsw/> },
  { path: "/myBlog", element: <MyBlog/> },

  
])
function App() {
  const dispatch = useDispatch()
  const token = localStorage.getItem("token")
  const keepLogin = async() => {
    try{
      const response =  await Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/auth/", { 
        headers: { 
          Authorization: `Bearer ${token}`,
        },
      })
      const { username, email, phone, imgProfile } = response.data
      dispatch(setValue({ username,email,phone,imgProfile }))
      console.log(response.data);
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
      token ? keepLogin() : console.log('Sign in first');
  },[])
  return (
    <div>
    <RouterProvider router={router}/>
    </div>
  )
}

export default App;
