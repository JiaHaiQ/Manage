import router from "./index";
import { getToKen } from "utils/app";

const whiteRouter = ["/login"];

router.beforeEach((to, from, next) => {
  if (getToKen()) {
    next();
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
});
