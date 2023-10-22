import Products from "../screens/Product";
import Login from "../screens/auth/login";
import SignUp from "../screens/auth/signup";
import CreateAdd from "../screens/createAdd";
import Dashboard from "../screens/Dashboard";
import Home from "../screens/home";
import MainLayout from "../layout/MainLayout";
import Profile from "../screens/profile";
import Aboutus from "../screens/aboutus";
import Policies from "../screens/policies";
import Terms from "../screens/terms";
import EditProfile from "../screens/editProfile";
import ChangePassword from "../screens/editProfile/changePassword";
import PromoteAdd from "../screens/createAdd/components/PromoteAdd";
import SelectCategory from "../screens/createAdd/components/SelectCategory";
import SelectSubCategory from "../screens/createAdd/components/SelectSubCategory";
import PostDetails from "../screens/createAdd/components/PostDetails";

export const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: "/createPost/selectCategory",
    element: (
      <MainLayout>
        <SelectCategory />
      </MainLayout>
    ),
  },
  {
    path: "/createPost/selectSubCategory/:categoryId",
    element: (
      <MainLayout>
        <SelectSubCategory />
      </MainLayout>
    ),
  },
  {
    path: "/createPost/addpostdetails/:categoryName/:SubCategoryId",
    element: (
      <MainLayout>
        <PostDetails />
      </MainLayout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <MainLayout>
        <Dashboard />
      </MainLayout>
    ),
  },
  {
    path: "/products/:id",
    element: (
      <MainLayout>
        <Products />
      </MainLayout>
    ),
  },
  {
    path: "/profile",
    element: (
      <MainLayout>
        <Profile />
      </MainLayout>
    ),
  },
  {
    path: "/aboutus",
    element: (
      <MainLayout>
        <Aboutus />
      </MainLayout>
    ),
  },
  {
    path: "/policies",
    element: (
      <MainLayout>
        <Policies />
      </MainLayout>
    ),
  },
  {
    path: "/t&c",
    element: (
      <MainLayout>
        <Terms />
      </MainLayout>
    ),
  },
  {
    path: "/editProfile",
    element: (
      <MainLayout>
        <EditProfile />
      </MainLayout>
    ),
  },
  {
    path: "/changePassword",
    element: (
      <MainLayout>
        {/* <ChangePassword /> */}
        <Profile />
      </MainLayout>
    ),
  },
  {
    path: "/promoteAdd",
    element: (
      <MainLayout>
        <PromoteAdd />
      </MainLayout>
    ),
  },
];
