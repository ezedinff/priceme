import * as React from "react";
import {AuthProvider} from "./contexts/auth";
import PriceMeRoutes from "./routes";

export default function App() {
  return (
      <AuthProvider>
        <PriceMeRoutes />
      </AuthProvider>
  );
}
