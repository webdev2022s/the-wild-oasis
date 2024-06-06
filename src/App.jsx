import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyle from "./styles/GlobalStyle";
import Booking from "./pages/Booking";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import Setting from "./pages/Setting";
import User from "./pages/User";
import AppLayout from "./ui/AppLayout";
import BookingDetails from "./pages/BookingDetails";
import CheckIn from "./pages/CheckIn";
import ProtectedRoutes from "./ui/ProtectedRoutes";
import { DarkModeProvider } from "./context/DarkModeContextProvider";
import ForgotPassword from "./features/authentication/ForgotPassword";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyle />
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoutes>
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="account" element={<Account />} />
                <Route path="booking" element={<Booking />} />
                <Route path="booking/:bookingId" element={<BookingDetails />} />
                <Route path="checkin/:bookingId" element={<CheckIn />} />
                <Route path="cabins" element={<Cabins />} />
                <Route path="setting" element={<Setting />} />
                <Route path="user" element={<User />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="reset" element={<ForgotPassword />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster
            position="top-center"
            gutter={10}
            containerStyle={{
              margin: "8px",
              fontFamily: "sono",
              fontWeight: "300",
            }}
            toastOptions={{
              success: {
                duration: 3000,
                theme: {
                  primary: "green",
                },
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </QueryClientProvider>
      </DarkModeProvider>
    </>
  );
}

export default App;
