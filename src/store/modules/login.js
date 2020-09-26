import { Login } from "api/login";

const state = {}

const getters = {}

const mutations = {}
const actions = {
    login(content, data) {
        return new Promise((resolve, reject) => {
            Login(data).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
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