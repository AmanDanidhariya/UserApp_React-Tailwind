import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from "./pages/LoginForm/Login";
import SignUpForm from "./pages/SingUpForm/SignUp";
import UserTable from "./pages/User/UserTable";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import UpdateUserForm from "./Components/UpdateUserForm/UpdateUserForm";

// const router = createBrowserRouter([
//   { path: "/", element: <UserTable /> },
//   { path: "/signup", element: <SignUpForm /> },
//   { path: "/login", element: <Login /> },
// ]);

function App() {
  const routeDefination = createRoutesFromElements(
    <Route>
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserTable />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/" element={<Login />} />
      <Route path="updateUserForm" element={<UpdateUserForm />} />
    </Route>
  );

  const router = createBrowserRouter(routeDefination);
  return <RouterProvider router={router} />;
}

export default App;
