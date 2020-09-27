import { Login } from "api/login";
import { setToKen, setUserName, getUserName } from "utils/app";

const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
  to_ken: "",
  username: getUserName() || ""
};

const getters = {
  isCollapse: state => state.isCollapse
};

const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  },
  SET_TOKEN(state, value) {
    state.to_ken = value;
  },
  SET_USERNAME(state, value) {
    state.username = value;
  }
};
const actions = {
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      Login(data)
        .then(res => {
          let data = res.data.data;
          commit("SET_TOKEN", data.token);
          setToKen(data.token);
          commit("SET_USERNAME", data.username);
          setUserName(data.username);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
