import Vue from "vue";
import VueRouter from "vue-router";
import Brand from "../components/brands/Brand";
import BrandsList from "../components/brands/BrandsList";
import Category from "../components/categories/Category";
import CategoriesList from "../components/categories/CategoriesList";
import Product from "../components/products/Product";
import ProductsList from "../components/products/ProductsList";

Vue.use(VueRouter);

const routes = [
  {
    path: "/products",
    name: "Products",
    component: ProductsList
  },
  {
    path: "/products/:id",
    name: "Product",
    component: Product,
    props: { route: "products" }
  },
  {
    path: "/brands",
    name: "Brands",
    component: BrandsList
  },
  {
    path: "/brands/:id",
    name: "Brand",
    component: Brand,
    props: { route: "brands" }
  },
  {
    path: "/categories",
    name: "Categories",
    component: CategoriesList
  },
  {
    path: "/categories/:id",
    name: "Category",
    component: Category,
    props: { route: "categories" }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
