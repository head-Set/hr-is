import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
var send = axios.create({
  baseURL: 'http://localhost:2400/head-Set',
  timeout: 3000,
  headers: {
    authorization: localStorage.getItem('token') || ''
  }
});

export default new Vuex.Store({
  state: {
    emp_no: 16102492,
    pass: "dmmmsu",
    employees: [],
    employee: [],
  },
  getters: {
    employees(state) { return state.employees },
    employee(state) { return state.employee }
  },
  mutations: {
    setEmps(state, data) {
      state.employees = data
    },
    setEmp(state, data) {
      state.employee = data
    }
  },
  actions: {
    async viewEmp({ commit }, payload) {
      let check = await send.get(`/emp/${payload}`)
      if (!check) {
         return new Error("Something went Wrong")
      } else {
        commit('setEmp',check.data)
        return true
       }
    },
    async deleteEmp({ commit }, payload) {
      alert(payload)
    },
    async fetchEmps({ commit }) {
      await send.get('/home')
        .then(resp => {
          commit('setEmps', resp.data)
        })
        .catch(err => console.log(err))
    },
    async login({ state }, payload) {
      if (payload.emp_no != state.emp_no) {
        return new Error("No User Found")
      } else if (payload.pass != state.pass) {
        return new Error('Wrong Password')
      } else {
        await send.post('/login', payload.emp_no)
          .then(response => {
            localStorage.setItem('token', response.data.token)
            send.defaults.headers['authorization'] = response.data.token
          })
          .catch(err => console.log(err))
        return true
      }
    }
  },
  modules: {
  }
})