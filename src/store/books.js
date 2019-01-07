export default {
  state: {
    books: [
      {
        id: 'dfsdfs',
        title: 'Harry Potter und der Stein Weisen - 1',
        description: 'Первая глава первой книги о Гарри Поттере',
        image: 'dfgsgs',
        parts: 7,
        level: ['B2', 'C1'],
        rating: 4,
        ratingCount: 100,
        youtube_playlist_id: 'sdfsfse',
      },
      {
        id: 'dfsdfsfsfsfs',
        title: 'Harry Potter und der Stein Weisen - 2',
        description: 'Вторая глава первой книги о Гарри Поттере',
        image: 'dfgsgaaaaweer',
        parts: 7,
        level: ['A2', 'B2'],
        rating: 3.5,
        ratingCount: 65,
        youtube_playlist_id: 'sdfsfsefsfs',
      },
      {
        id: 'dfsdfsfsfsfsaaaaa',
        title: 'Harry Potter und der Stein Weisen - 3',
        description: 'Третья глава первой книги о Гарри Поттере',
        image: 'dfgsgsdfsdfs',
        parts: 7,
        level: ['A1'],
        rating: 2,
        ratingCount: 77,
        youtube_playlist_id: 'sdfsfsefsfsetyyy',
      },
    ],
  },
  mutations: {
    setBooks(state, payload) {
      state.books = payload;
    },
  },
  getters: {
    getBooks: state => state.books,
  },
};
