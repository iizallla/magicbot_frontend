import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "./components/theme-provider";
import Users from "./payments/users";
import Models from "./pages/models";
import Sales from "./pages/sales";
import StoreProducts from "./pages/online-shop/StoreProducts";
import SalesSettings from "./pages/SalesSettings";
import Reviews from "./pages/reviews";
import ProductsCategories from "./pages/online-shop/Categories";
import UsersSlug from "./pages/users/slug";
import Filials from "./pages/filial/FilialTable";
import Settings from "./pages/settings";
import Delivering from "./pages/delivering-methods";
import DeliveringMethods from "./pages/delivering-methods";
import Promocodes from "./pages/promocodes";
import CreateAccount from "./pages/Login/Login";
import Register from "./pages/Register/Register";

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
          <Route path="/login" element={<CreateAccount />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute element={<Models />} />} />
          <Route path="/users" element={<PrivateRoute element={<Users />} />} />
          <Route path="/sales" element={<PrivateRoute element={<Sales />} />} />
          <Route
            path="/sales/:id"
            element={<PrivateRoute element={<Sales />} />}
          />
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
          <Route
            path="/categories"
            element={<PrivateRoute element={<ProductsCategories />} />}
          />
          <Route
            path="/rewievs"
            element={<PrivateRoute element={<Reviews />} />}
          />
          <Route
            path="/filials"
            element={<PrivateRoute element={<Filials />} />}
          />
          <Route
            path="/settings"
            element={<PrivateRoute element={<Settings />} />}
          />
          <Route
            path="/marketing/promocodes"
            element={<PrivateRoute element={<Promocodes />} />}
          />
          <Route
            path="/marketing/messages"
            element={<PrivateRoute element={<Promocodes />} />}
          />
          <Route
            path="/delivering-methods"
            element={<PrivateRoute element={<DeliveringMethods />} />}
          />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
