import router from "./index";
import store from "@/store/index";
import { getToKen, removeToKen, removeUserName } from "utils/app";

const whiteRouter = ["/login"];
// 路由拦截
router.beforeEach((to, from, next) => {
  if (getToKen()) {
    if (to.path === "/login") {
      removeToKen();
      removeUserName();
      store.commit("app/SET_TOKEN", "");
      store.commit("app/SET_USERNAME", "");
      next();
    } else {
      if (store.getters['intercept/roles'].length === 0) {
        store.dispatch("intercept/getRoles").then(res => {
          store.dispatch("intercept/createRouter", res).then(res => {
            let addRouters = store.getters['intercept/addRouters'];
            let allRouters = store.getters['intercept/allRouters'];
            // 路由更新
            router.options.routes = allRouters;
            // 添加动态路由
            router.addRoutes(addRouters)
            next({ ...to, replace: true});
          })
        })
      } else {
        next();
      }
    }
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
});
