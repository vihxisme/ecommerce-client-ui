import GeneralLayout from "@/layouts/GeneralLayout.vue";
import HomePage from "@/pages/Home/HomePage.vue";
import NewProduct from "@/pages/Products/NewProduct.vue";
import PromoProduct from "@/pages/Products/PromoProduct.vue";
import ProductDetails from "@/pages/Products/ProductDetails.vue";
import OrderProduct from "@/pages/Order/OrderProduct.vue";
import LoginPage from "@/pages/Login/LoginPage.vue";
import OfCustomerPage from "@/pages/OfCustomer/OfCustomerPage.vue";
import ByCategory from "@/pages/Products/ByCategory.vue";
import ShirtPants from "@/pages/Products/ShirtPants.vue";

const routes = [
  {
    path: "/",
    component: GeneralLayout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: HomePage,
      },
      {
        path: "collections/new",
        name: "New Product",
        component: NewProduct,
      },
      {
        path: "collections/onsale",
        name: "Promo Product",
        component: PromoProduct
      },
      {
        path: "collections/:name/:apparelType",
        name: "Shirt Pants",
        component: ShirtPants
      },
      {
        path: "products/details/:productName",
        name: "Product Details",
        component: ProductDetails
      },
      {
        path: "account/of-customer",
        name: "Of Customer",
        component: OfCustomerPage
      },
      {
        path: "collections/:categorySlug",
        name: "By Category",
        component: ByCategory
      }
    ],
  },
  {
    path: "/checkout",
    name: "CheckOut",
    component: OrderProduct
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage
  }
];

export default routes;