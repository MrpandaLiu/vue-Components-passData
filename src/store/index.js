import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'panda'
  },
  mutations: {
    EDIT_NAME(state,payload) {
      state.name = payload.name;
    }
  },
  actions: {
    AWAIT_NAME(mutations,data) {
      setTimeout(_ => {
        mutations.commit('EDIT_NAME',data)
      },2000)
    }
  },
})
