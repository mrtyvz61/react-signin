import * as React from "react";

import { SigninProvider } from "./context";
import Login from "./components";

function App() {
  return (
    <>
      <SigninProvider>
        <Login />
      </SigninProvider>
    </>
  );
}

export default App;
