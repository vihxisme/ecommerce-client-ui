import GeneralLayout from "@/layouts/GeneralLayout.vue";
import HomePage from "@/pages/Home/HomePage.vue";
import NewProduct from "@/pages/Products/NewProduct.vue";
import PromoProduct from "@/pages/Products/PromoProduct.vue";
import ShirtProduct from "@/pages/Products/ShirtProduct.vue";
import TshirtProduct from "@/pages/Products/TshirtProduct.vue";
import FormalShirtProduct from "@/pages/Products/FormalShirtProduct.vue";
import PoloShirtProduct from "@/pages/Products/PoloShirtProduct.vue";
import JacketProduct from "@/pages/Products/JacketProduct.vue";
import SweaterProduct from "@/pages/Products/SweaterProduct.vue";
import WoolSweaterProduct from "@/pages/Products/WoolSweaterProduct.vue";
import BlazerProduct from "@/pages/Products/BlazerProduct.vue";
import PantsProduct from "@/pages/Products/PantsProduct.vue";
import JeansProduct from "@/pages/Products/JeansProduct.vue";
import TrousersProduct from "@/pages/Products/TrousersProduct.vue";
import ShortsProduct from "@/pages/Products/ShortsProduct.vue";
import ProductDetails from "@/pages/Products/ProductDetails.vue";
import OrderProduct from "@/pages/Order/OrderProduct.vue";
import LoginPage from "@/pages/Login/LoginPage.vue";
import OfCustomerPage from "@/pages/OfCustomer/OfCustomerPage.vue";

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
        path: "products/new",
        name: "New Product",
        component: NewProduct,
      },
      {
        path: "products/promo",
        name: "Promo Product",
        component: PromoProduct
      },
      {
        path: "products/shirt",
        name: "Shirt",
        component: ShirtProduct
      },
      {
        path: "products/shirt/t-shirt",
        name: "T-shirt",
        component: TshirtProduct
      },
      {
        path: "products/shirt/formal-shirt",
        name: "Formal-Shirt",
        component: FormalShirtProduct
      },
      {
        path: "products/shirt/polo-shirt",
        name: "Polo-Shirt",
        component: PoloShirtProduct
      },
      {
        path: "products/shirt/jacket",
        name: "Jacket",
        component: JacketProduct
      },
      {
        path: "products/shirt/sweater",
        name: "Sweater",
        component: SweaterProduct,
      },
      {
        path: "products/shirt/wool-sweater",
        name: "Wool Sweater",
        component: WoolSweaterProduct
      },
      {
        path: "products/shirt/blazer",
        name: "Blazer",
        component: BlazerProduct
      },
      {
        path: "products/pants",
        name: "Pants",
        component: PantsProduct
      },
      {
        path: "products/pants/jeans",
        name: "Jeans",
        component: JeansProduct
      },
      {
        path: "products/pants/trousers",
        name: "Trousers",
        component: TrousersProduct
      },
      {
        path: "products/pants/shorts",
        name: "Shorts",
        component: ShortsProduct
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
      }
    ],
  },
  {
    path: "/order",
    name: "OrderProduct",
    component: OrderProduct
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage
  }
];

export default routes;