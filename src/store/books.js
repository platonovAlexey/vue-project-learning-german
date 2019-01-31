import Vue from 'vue';

export default {
  state: {
    books: [],
    // books: [
    //   {
    //     id: 'dfsdfs',
    //     title: 'Harry Potter und der Stein Weisen - 1',
    //     description: 'Первая глава первой книги о Гарри Поттере',
    //     image: 'dfgsgs',
    //     level: ['B2', 'C1'],
    //     rating: 4,
    //     ratingCount: 100,
    //     youtube_playlist_id: 'sdfsfse',
    //     parts: [
    //       {
    //         id: '145terds1',
    //         title: 'Kapitel 1',
    //         youtube_id: '1dsafafafa1',
    //       },
    //       {
    //         id: '145terds2',
    //         title: 'Kapitel 2',
    //         youtube_id: '1dsafafafa2',
    //       },
    //       {
    //         id: '145terds3',
    //         title: 'Kapitel 3',
    //         youtube_id: '1dsafafafa3',
    //       },
    //       {
    //         id: '145terds4',
    //         title: 'Kapitel 4',
    //         youtube_id: '1dsafafafa4',
    //       },
    //     ],
    //   },
    //   {
    //     id: 'dfsdfsfsfsfs',
    //     title: 'Harry Potter und der Stein Weisen - 2',
    //     description: 'Вторая глава первой книги о Гарри Поттере',
    //     image: 'dfgsgaaaaweer',
    //     level: ['A2', 'B2'],
    //     rating: 3.5,
    //     ratingCount: 65,
    //     youtube_playlist_id: 'sdfsfsefsfs',
    //     parts: [
    //       {
    //         id: '2345terds1',
    //         title: 'Kapitel 1',
    //         youtube_id: '2dsafafafa1',
    //       },
    //       {
    //         id: '2345terds2',
    //         title: 'Kapitel 2',
    //         youtube_id: '2dsafafafa2',
    //       },
    //       {
    //         id: '2345terds3',
    //         title: 'Kapitel 3',
    //         youtube_id: '2dsafafafa3',
    //       },
    //       {
    //         id: '2345terds4',
    //         title: 'Kapitel 4',
    //         youtube_id: '2dsafafafa4',
    //       },
    //     ],
    //   },
    //   {
    //     id: 'dfsdfsfsfsfsaaaaa',
    //     title: 'Harry Potter und der Stein Weisen - 3',
    //     description: 'Третья глава первой книги о Гарри Поттере',
    //     image: 'dfgsgsdfsdfs',
    //     level: ['A1'],
    //     rating: 2,
    //     ratingCount: 77,
    //     youtube_playlist_id: 'sdfsfsefsfsetyyy',
    //     parts: [
    //       {
    //         id: 'dfsdfsdfsfAA',
    //         title: 'Kapitel 1',
    //         youtube_id: '3dsafafafa1',
    //       },
    //       {
    //         id: '3345terds2',
    //         title: 'Kapitel 2',
    //         youtube_id: '3dsafafafa2',
    //       },
    //       {
    //         id: '3345terds3',
    //         title: 'Kapitel 3',
    //         youtube_id: '3dsafafafa3',
    //       },
    //       {
    //         id: '3345terds4',
    //         title: 'Kapitel 4',
    //         youtube_id: '3dsafafafa4',
    //       },
    //     ],
    //   },
    // ],
    // bookParts: [
    //   {
    //     // bookId: 'dfsdfsfsfsfsaaaaaBB',
    //     bookId: 'dfsdfsfsfsfsaaaaa',
    //     bookPartId: 'dfsdfsdfsfAA',
    //     bookTitle: 'Harry Potter und der Stein Weisen - 3',
    //     partTitle: 'Kapitel 1',
    //     youtube_id: 'u4DUmKFScvU',
    //     content: [
    //       {
    //         sentences: [
    //           {
    //             origText: 'Este pur şi simplu o machetă pentru text a industriei tipografice. Lorem Ipsum a fost macheta standard a industriei încă din secolul al XVI-lea, când un tipograf anonim a luat o planşetă de litere şi le-a amestecat pentru a crea o carte demonstrativă pentru literele respective.',
    //             transText: 'это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
    //           },
    //           {
    //             origText: 'Nu doar că a supravieţuit timp de cinci secole, dar şi a facut saltul în tipografia electronică practic neschimbată. A fost popularizată în',
    //             transText: 'В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только',
    //           },
    //           {
    //             origText: 'anii "60 odată cu ieşirea colilor Letraset care conţineau pasaje Lorem Ipsum, ',
    //             transText: 'успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов ',
    //           },
    //           {
    //             origText: 'iar mai recent, prin programele de publicare pentru calculator, ca Aldus PageMaker care includeau versiuni de Lorem Ipsum.',
    //             transText: 'Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.',
    //           },
    //         ],
    //       },
    //       {
    //         sentences: [
    //           {
    //             origText: '1 Este pur şi simplu o machetă pentru text a industriei tipografice. Lorem Ipsum a fost macheta standard a industriei încă din secolul al XVI-lea, când un tipograf anonim a luat o planşetă de litere şi le-a amestecat pentru a crea o carte demonstrativă pentru literele respective.',
    //             transText: '1 это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
    //           },
    //           {
    //             origText: '2 Este pur şi simplu o machetă pentru text a industriei tipografice. Lorem Ipsum a fost macheta standard a industriei încă din secolul al XVI-lea, când un tipograf anonim a luat o planşetă de litere şi le-a amestecat pentru a crea o carte demonstrativă pentru literele respective.',
    //             transText: '2 это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
    //           },
    //           {
    //             origText: '3 Este pur şi simplu o machetă pentru text a industriei tipografice. Lorem Ipsum a fost macheta standard a industriei încă din secolul al XVI-lea, când un tipograf anonim a luat o planşetă de litere şi le-a amestecat pentru a crea o carte demonstrativă pentru literele respective.',
    //             transText: '3 это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
    //           },
    //           {
    //             origText: '4 Este pur şi simplu o machetă pentru text a industriei tipografice. Lorem Ipsum a fost macheta standard a industriei încă din secolul al XVI-lea, când un tipograf anonim a luat o planşetă de litere şi le-a amestecat pentru a crea o carte demonstrativă pentru literele respective.',
    //             transText: '4 это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
    //           },
    //         ],
    //       },
    //     ],
    //     words: [
    //       {
    //         origWord: 'Hellow',
    //         transWord: 'Привет',
    //       },
    //       {
    //         origWord: 'Hello2',
    //         transWord: 'Привет2',
    //       },
    //       {
    //         origWord: 'Hellow3',
    //         transWord: 'Привет3',
    //       },
    //       {
    //         origWord: 'Hello4',
    //         transWord: 'Привет4',
    //       },
    //       {
    //         origWord: 'Hellow5',
    //         transWord: 'Привет5',
    //       },
    //       {
    //         origWord: 'Hellow6',
    //         transWord: 'Привет6',
    //       },
    //       {
    //         origWord: 'Hellow7',
    //         transWord: 'Привет7',
    //       },
    //       {
    //         origWord: 'Hellow8',
    //         transWord: 'Привет8',
    //       },
    //     ],
    //   },
    // ],
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
