import * as React from "react";
import {
  Link,
  useNavigate,
  Outlet
} from "react-router-dom";
import {AuthProvider, useAuthState} from "./contexts/auth/index";
import PriceMeRoutes from "./routes";

export default function App() {
  return (
      <AuthProvider>
        <PriceMeRoutes />
      </AuthProvider>
  );
}

function Layout() {
  return (
      <div>
        <AuthStatus />

        <ul>
          <li>
            <Link to="/">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>

        <Outlet />
      </div>
  );
}


function AuthStatus() {
  let auth = useAuthState();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
      <p>
        Welcome {auth.user}!{" "}
        <button
            onClick={() => {
              auth.signout(() => navigate("/"));
            }}
        >
          Sign out
        </button>
      </p>
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}
