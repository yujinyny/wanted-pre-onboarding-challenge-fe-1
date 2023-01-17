import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import TodoDetail from "./pages/TodoDetail";
import { useSetRecoilState } from "recoil";
import { loginState } from "./atom/auth";
import instance from "./api/root";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  const setLogin = useSetRecoilState(loginState);

  // 새로고침 할 때마다 적용
  useEffect(() => {
    if (localStorage.getItem("token")) {
      instance.defaults.headers.Authorization = localStorage.getItem("token");
      setLogin(true);
    }
  }, [setLogin]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/:type" element={<SignUp />} />
          <Route path="/todo/:id" element={<TodoDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
