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
      }
    ],
  },
];

export default routes;