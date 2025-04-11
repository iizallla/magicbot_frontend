import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "./components/theme-provider";
import Users from "./pages/users";
import Models from "./pages/models";
import Sales from "./pages/sales";
import StoreProducts from "./pages/online-shop/StoreProducts";
import SalesSettings from "./pages/SalesSettings";

const isAuthenticated = () => true;

const Layout = ({ children }) => (
  <div className="[--header-height:calc(theme(spacing.14))]">
    <SidebarProvider className="flex flex-col">
      <SiteHeader />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="p-4">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  </div>
);

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? (
    <Layout>{element}</Layout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default function Page() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="admin-key">
        <Routes>
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/logout" element={<h1>Logout</h1>} />
          <Route path="/" element={<PrivateRoute element={<Users />} />} />
          <Route path="/users" element={<PrivateRoute element={<Users />} />} />
          <Route path="/sales" element={<PrivateRoute element={<Sales />} />} />
          <Route
            path="/models"
            element={<PrivateRoute element={<Models />} />}
          />
          <Route
            path="/products"
            element={<PrivateRoute element={<StoreProducts />} />}
          />
          <Route
            path="/sales/settings"
            element={<PrivateRoute element={<SalesSettings />} />}
          />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
