import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/Auth";
import "./App.css";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import TodoDetail from "./pages/TodoDetail";
import { useSetRecoilState } from "recoil";
import { loginState } from "./atom/auth";

function App() {
  const setLogin = useSetRecoilState(loginState);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogin(true);
    }
  }, [setLogin]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/:type" element={<SignUp />} />
        <Route path="/todo/:id" element={<TodoDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
