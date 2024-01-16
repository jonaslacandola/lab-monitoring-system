import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "./ui/AppLayout";
import Attendance from "./pages/Attendance";
import Login from "./pages/Login";
import PageNotFound from "./ui/PageNotFound";
import ProtectedRoute from "./ui/ProtectedRoute";
import ReRouter from "./ui/ReRouter";
import Dashboard from "./pages/Dashboard";
import Computers from "./pages/Computers";
import Laboratories from "./pages/Laboratories";
import Admin from "./pages/Admin";
import AdminAppLayout from "./features/users/AdminAppLayout";

import GlobalStyles from "./styles/GlobalStyles";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ReRouter>
                <AppLayout />
              </ReRouter>
            }
          >
            <Route index element={<Navigate replace to={"/attendance"} />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminAppLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={<Navigate replace to={"/admin/dashboard"} />}
            />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/computer" element={<Computers />} />
            <Route path="/admin/laboratory" element={<Laboratories />} />
            <Route path="/admin/admin" element={<Admin />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          position: "top-right",
          style: {
            fontSize: "15px",
          },
        }}
      />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
