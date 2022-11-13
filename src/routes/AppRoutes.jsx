import {
  Route,
  Navigate,
  BrowserRouter as Router,
  Routes as Switch,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { privateRoutes, publicRoutes } from "./routes";

const AboutUS = lazy(() => import("../Component/AboutUS"));
const ContactUS = lazy(() => import("../Component/ContactUS"));
const JoinGroup = lazy(() => import("../Component/JoinGroup"));
const GetStarted = lazy(() => import("../Component/GetStarted"));
const Forgotpassword = lazy(() => import("../Component/ForgotPassword"));
const Resetpassword = lazy(() => import("../Component/ResetPassword"));
const AddContactInfo = lazy(() => import("../Component/ContactInfo"));
const Login = lazy(() => import("../Component/Login"));
const ViewTemplate = lazy(() => import("../Component/ViewTemaplate"));
const Error = lazy(() => import("../Component/CommonComponents/Error"));

const AppRoutes = () => {
  const loginData = useSelector((state) => state.auth?.loginData);
  const isAuth =
    loginData === null || loginData === undefined || loginData === ""
      ? false
      : true;
  console.log('isAuth', isAuth)

  return (
    <Suspense
      fallback={
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      }
    >
      <Router>
        <Switch>
          {publicRoutes.map(({ element: Element, path, index }) => (
            <Route path={path} key={index} element={!isAuth ? <Element /> : <Navigate to="/admin-tools" />} />

          ))}

          {!isAuth ? (
            <Route path="/*" element={<Navigate to="/login" />} />
          ) : (
            privateRoutes.map(({ element: Element, path, index }) => (
              <>
                <Route path={path} key={index} element={<Element />} />
                <Route path="/*" element={<Navigate to="/" />} />
              </>
            ))
          )}
        </Switch>
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
