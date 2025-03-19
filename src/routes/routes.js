import GeneralLayout from "@/layouts/GeneralLayout.vue";
import HomePage from "@/pages/Home/HomePage.vue";
import NewProduct from "@/pages/Products/NewProduct.vue";
import PromoProduct from "@/pages/Products/PromoProduct.vue";
import TshirtProduct from "@/pages/Products/TshirtProduct.vue";

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
        path: "products/shirt/t-shirt",
        name: "T-shirt Product",
        component: TshirtProduct
      }
    ],
  },
];

export default routes;