import firebase from 'firebase';
import { EventBus } from '../infrastructure/eventBus';

export default {
  state: {
    user: {
      isAuthenticated: false,
      uid: null,
      name: null,
      email: null,
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user.isAuthenticated = true;
      state.user.uid = payload.uid;
      state.user.email = payload.email;
    },
    unsetUser(state) {
      state.user = {
        isAuthenticated: false,
        uid: null,
      };
    },
    setUserName(state, payload) {
      state.user.name = payload;
    },
    setUserEmail(state, payload) {
      state.user.email = payload;
    },
  },
  actions: {
    signUp({ commit }, payload) {
      commit('setProcessing', true);
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          firebase.auth().currentUser.updateProfile({ displayName: payload.name })
            .then(() => commit('setUserName', payload.name));
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
        commit('setUser', { uid: payload.uid, email: payload.email });
        commit('setUserName', payload.displayName);
        dispatch('loadUserData', payload.uid);
      } else {
        commit('unsetUser');
      }
    },
    signOut() {
      firebase.auth().signOut();
    },
    changeUserProfileData({ commit }, payload) {
      const user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        payload.email,
        payload.password,
      );

      commit('setProcessing', true);
      commit('clearError');

      user.reauthenticateAndRetrieveDataWithCredential(credential).then(() => {
        const currentUser = firebase.auth().currentUser;
        if (payload.changeType === 'name') {
          currentUser.updateProfile({ displayName: payload.newName })
            .then(() => {
              commit('setUserName', payload.newName);
              commit('setProcessing', false);
              EventBus.notify('userProfileDataChanged');
            })
            .catch((error) => {
              commit('setProcessing', false);
              commit('setError', error.message);
            });
        }
        if (payload.changeType === 'email') {
          currentUser.updateEmail(payload.newEmail)
            .then(() => {
              commit('setUserEmail', payload.newEmail);
              commit('setProcessing', false);
              EventBus.notify('userProfileDataChanged');
            })
            .catch((error) => {
              commit('setProcessing', false);
              commit('setError', error.message);
            });
        }
        if (payload.changeType === 'password') {
          currentUser.updatePassword(payload.newPassword)
            .then(() => {
              commit('setProcessing', false);
              EventBus.notify('userProfileDataChanged');
            })
            .catch((error) => {
              commit('setProcessing', false);
              commit('setError', error.message);
            });
        }
      }).catch((error) => {
        commit('setProcessing', false);
        commit('setError', error.message);
      });
    },
  },
  getters: {
    userId: state => state.user.uid,
    userName: state => state.user.name,
    userEmail: state => state.user.email,
    isUserAuthenticated: state => state.user.isAuthenticated,
  },
};
