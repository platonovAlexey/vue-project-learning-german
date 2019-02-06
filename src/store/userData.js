import Vue from 'vue';

const defaultUserData = {
  books: {},
  words: {},
};

export default {
  state: {
    userData: defaultUserData,
  },
  mutations: {
    setUserData(state, payload) {
      state.userData = payload;
    },
    addUserBook(state, payload) {
      Vue.set(state.userData.books, payload.bookId, payload.book);
    },
    addUserBookPart(state, payload) {
      Vue.set(state.userData.books[payload.bookId].parts, payload.partId, { addedDate: payload.timestamp });
    },
    updateUserBookPartLastOpenedDate(state, payload) {
      Vue.set(state.userData.books[payload.bookId].parts[payload.partId], 'lastOpenedDate', payload.timestamp);
    },
    updateUserBookPartFinishInfo(state, payload) {
      Vue.set(state.userData.books[payload.bookId].parts[payload.partId], 'finishedDate', payload.timestamp);
      Vue.set(state.userData.books[payload.bookId].parts[payload.partId], 'rating', payload.rating);
    },
  },
  getters: {
    userData: state => state.userData,
  },
  actions: {
    loadUserData({ commit }, payload) {
      commit('setProcessing', true);
      const userDataRef = Vue.$db.collection('userData').doc(payload);
      userDataRef.get()
        .then((data) => {
          const userData = data.exists ? data.data() : defaultUserData;

          if (!userData.books) userData.books = {};

          // eslint-disable-next-line no-restricted-syntax
          // for (const key in userData.books) {
          //   if (userData.books.hasOwnProperty(key)) {
          //     userData.books[key].addedDate = userData.books[key].addedDate.toDate();
          //   }
          // }

          commit('setUserData', userData);
          commit('setProcessing', false);
        })
        .catch(() => {
          commit('setProcessing', false);
        });
    },
    addUserBook({ commit, getters }, payload) {
      commit('setProcessing', true);
      const userDataRef = Vue.$db.collection('userData').doc(getters.userId);
      const book = {
        addedDate: new Date(),
        parts: {},
      };

      userDataRef.set({
        books: {
          [payload]: book,
        },
      }, { merge: true })
        .then(() => {
          commit('addUserBook', { bookId: payload, book });
          commit('setProcessing', false);
        })
        .catch(() => {
          commit('setProcessing', false);
        });
    },
    updateUserBookPartStats({ commit, getters }, payload) {
      const userDataRef = Vue.$db.collection('userData').doc(getters.userId);
      const timestamp = new Date();

      if (!getters.userData.books[payload.bookId].parts[payload.partId]) {
        userDataRef.update({
          [`books.${payload.bookId}.parts.${payload.partId}.addedDate`]: timestamp,
        })
          .then(() => {
            commit('addUserBookPart', { bookId: payload.bookId, partId: payload.partId, timestamp });
          });
      }

      userDataRef.update({
        [`books.${payload.bookId}.parts.${payload.partId}.lastOpenedDate`]: timestamp,
      })
        .then(() => {
          commit('updateUserBookPartLastOpenedDate', { bookId: payload.bookId, partId: payload.partId, timestamp });
        });
    },
    finishUserBookPart({ commit, getters }, payload) {
      const userDataRef = Vue.$db.collection('userData').doc(getters.userId);
      const timestamp = new Date();

      userDataRef.update({
        [`books.${payload.bookId}.parts.${payload.partId}.finishedDate`]: timestamp,
        [`books.${payload.bookId}.parts.${payload.partId}.rating`]: payload.rating,
      })
        .then(() => {
          commit('updateUserBookPartFinishInfo', {
            bookId: payload.bookId, partId: payload.partId, timestamp, rating: payload.rating,
          });
        });
    },
  },
};
