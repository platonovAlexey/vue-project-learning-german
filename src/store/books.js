import Vue from 'vue';

export default {
  state: {
    books: [],
  },
  mutations: {
    setBooks(state, payload) {
      state.books = payload;
    },
  },
  getters: {
    getBooks: state => state.books,
  },
  actions: {
    loadBooks({ commit }) {
      Vue.$db.collection('books')
        .get()
        .then((querySnapshot) => {
          const books = [];
          querySnapshot.forEach((s) => {
            const data = s.data();
            const book = {
              id: s.id,
              title: data.title,
              description: data.description,
              imageUrl: data.imageUrl,
              level: data.level.slice(),
              youtube_playlist_id: data.youtube_playlist_id,
            };

            const parts = [];
            if (data.parts) {
              data.parts.forEach((p) => {
                const part = {
                  id: p.id,
                  title: p.title,
                  youtube_id: p.youtube_id,
                };

                parts.push(part);
              });
            }

            book.parts = parts;

            books.push(book);
          });

          commit('setBooks', books);
        })
        .catch(error => console.log(error));
    },
  },
};
