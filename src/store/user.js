import firebase from 'firebase';

export default {
  state: {
    user: {
      isAuthenticated: false,
      uid: null,
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user.isAuthenticated = true;
      state.user.uid = payload;
    },
    unsetUser(state) {
      state.user = {
        isAuthenticated: false,
        uid: null,
      };
    },
  },
  actions: {
    signUp({ commit }, payload) {
      commit('setProcessing', true);
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit('setProcessing', false);
        })
        .catch((error) => {
          commit('setProcessing', false);
          commit('setError', error.message);
        });
    },
    signIn({ commit }, payload) {
      commit('setProcessing', true);
      commit('clearError');
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit('setProcessing', false);
        })
        .catch((error) => {
          commit('setProcessing', false);
          commit('setError', error.message);
        });
    },
    stateChanged({ commit, dispatch }, payload) {
      if (payload) {
        commit('setUser', payload.uid);
        dispatch('loadUserData', payload.uid);
      } else {
        commit('unsetUser');
      }
    },
    signOut() {
      firebase.auth().signOut();
    },
  },
  getters: {
    userId: state => state.user.uid,
    isUserAuthenticated: state => state.user.isAuthenticated,
  },
};
