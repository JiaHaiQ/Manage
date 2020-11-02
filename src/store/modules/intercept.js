import { getUserRole } from "api/login";
import { defaultRouterMap, asnycRouterMap } from "@/router"

const state = {
    roles: [],
    allRouters: defaultRouterMap,
    addRouters: [],
}

const getters = {
    roles: state => state.roles,
    allRouters: state => state.allRouters,
    addRouters: state => state.addRouters,
}

const mutations = {
    SET_ROLES(state, roles) {
        state.roles = roles
    },
    SET_ROUTER(state, router) {
        state.addRouters = router
        state.allRouters = defaultRouterMap.concat(router)
    }
}

const actions = {
    getRoles({ commit }, repuestData) {
        return new Promise((resolve, reject) => {
            getUserRole().then(res => {
                let role = res.data.data.role
                commit('SET_ROLES', role)
                resolve(role)
            })
        })
    },
    /**
     * 创建动态路由
     */
    createRouter({ commit }, data) {
        return new Promise((resolve, reject) => {
            let role = data;
            // 超管的状态
            let addRouters = []
            if (role.includes('admin')) {
                addRouters = asnycRouterMap
            } else {
                // 普通管理员
                addRouters = asnycRouterMap.filter(item => {
                    if (role.includes(item.meta.system)) {
                        return item
                    }
                })
            }
            // 更新路由
            commit('SET_ROUTER', addRouters);
            resolve()
        })
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
