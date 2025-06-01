import GeneralLayout from "@/layouts/GeneralLayout.vue";
import HomePage from "@/pages/Home/HomePage.vue";
import NewProduct from "@/pages/Products/NewProduct.vue";
import PromoProduct from "@/pages/Products/PromoProduct.vue";
import ProductDetails from "@/pages/Products/ProductDetails.vue";
import OrderProduct from "@/pages/Order/OrderProduct.vue";
import OfCustomerPage from "@/pages/OfCustomer/OfCustomerPage.vue";
import ByCategory from "@/pages/Products/ByCategory.vue";
import ShirtPants from "@/pages/Products/ShirtPants.vue";
import AuthPage from "@/pages/Auth/AuthPage.vue";
import StoreLocator from "@/pages/StoreLocator.vue";
import VNPayResult from "@/pages/Payment/VNPayResult.vue";

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
        meta: {
          title: "Trang chủ - Bellion Shop",
        },
      },
      {
        path: "collections/new",
        name: "New Product",
        component: NewProduct,
        meta: {
          title: "Sản phẩm mới",
        }
      },
      {
        path: "collections/onsale",
        name: "Promo Product",
        component: PromoProduct,
        meta: {
          title: "Sản phẩm khuyến mãi",
        }
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
      },
      {
        path: "/store/:storeld",
        name: "Store Locator",
        component: StoreLocator,
        meta: {
          title: "Hệ thống cửa hàng"
        }
      }
    ],
  },
  {
    path: "/checkout",
    name: "CheckOut",
    component: OrderProduct
  },
  {
    path: "/auth",
    name: "Auth",
    component: AuthPage
  },
  {
    path: "/vnpay-result",
    name: "VNPayResult",
    component: VNPayResult
  }
];

export default routes;