import { Route, Navigate, Routes as Switch } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { masterAdminRoutes, privateRoutes, publicRoutes } from "./routes";
import { SpinnerLoader } from "../Component/loader/SpinnerLoader";

const JoinGroup = lazy(() => import("../Component/JoinGroup"));
const ViewTemplate = lazy(() => import("../Component/ViewTemaplate"));

const AppRoutes = () => {

  const loginData = useSelector((state) => state.auth?.loginData);
  const token = localStorage.getItem("token");
  const isAuth = (loginData === null || loginData === undefined || loginData === "") || (token === "" || token === null || token === undefined) ? false : true;

  return (
    <Suspense
      fallback={<SpinnerLoader />}
    >
      <Switch>
        {/* common routes which can access when user is loged in or not */}
        <Route path="/join-group" element=<JoinGroup /> />
        <Route exact path="/:siteName.conation.io" element={<ViewTemplate />} />

        {/* Public Routes (Before Login) */}
        {publicRoutes.map(({ element: Element, path }, index) => (
          <Route path={path} key={index + "a"} element={!isAuth ? <Element /> : (loginData?.IsMaster === "True" && String(loginData?.RoleID) === String(1) ? <Navigate to="/owner-admin-list" /> : <Navigate to="/admin-tools" />)} />
        ))}

        {/* Private Routes after login */}
        {isAuth && (
          (loginData?.IsMaster === "True" && String(loginData?.RoleID) === String(1) ? (
            masterAdminRoutes.map(({ element: Element, path }, index) => (
              <>
                <Route path={path} key={index + "b"} element={<Element />} />
                {/* <Route path="/*" element={<Navigate to="/" />} /> */}
              </>
            ))
          ) : (
            privateRoutes.map(({ element: Element, path }, index) => (
              <>
                <Route path={path} key={index + "c"} element={<Element />} />
                {/* <Route path="/*" element={<Navigate to="/" />} /> */}
              </>
            ))
          ))
        )}

        {/* if any routes not match 404 not found page */}
        <Route path="/*" element={<Navigate to="/" />} />
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
