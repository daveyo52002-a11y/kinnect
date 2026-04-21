// Mock data — replace with real API calls to GET /api/movies
export const GENRES = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Drama' },
  { id: 3, name: 'Comedy' },
  { id: 4, name: 'Thriller' },
  { id: 5, name: 'Sci-Fi' },
  { id: 6, name: 'Horror' },
  { id: 7, name: 'Romance' },
];

export const MOVIES = [
  {
    id: 1, title: 'Neon Requiem', genre_id: 4, genre: 'Thriller',
    year: 2023, rating: 8.4, stock_count: 3,
    duration: '2h 18m', director: 'Sofia Reyes',
    description: 'A detective unravels a conspiracy stretching across three cities, each clue pulling her deeper into a world she cannot escape.',
    poster_color: '#1a0a2e',
    accent: '#7b2fff',
  },
  {
    id: 2, title: 'Open Ocean', genre_id: 2, genre: 'Drama',
    year: 2022, rating: 7.9, stock_count: 5,
    duration: '1h 54m', director: 'Marcus Webb',
    description: 'Two strangers stranded at sea must confront their pasts before rescue arrives — if it arrives at all.',
    poster_color: '#061a28',
    accent: '#2ab8d8',
  },
  {
    id: 3, title: 'Iron Carnival', genre_id: 1, genre: 'Action',
    year: 2024, rating: 7.2, stock_count: 0,
    duration: '2h 05m', director: 'Jin Hatano',
    description: 'A former soldier infiltrates a heavily armed underground fighting ring to rescue his brother.',
    poster_color: '#1f0a08',
    accent: '#e84a2a',
  },
  {
    id: 4, title: 'The Quiet Hours', genre_id: 2, genre: 'Drama',
    year: 2023, rating: 9.1, stock_count: 2,
    duration: '2h 33m', director: 'Amara Osei',
    description: 'A woman returns to her childhood home and discovers a hidden archive of her mother\'s secret life.',
    poster_color: '#0f1208',
    accent: '#a8c84a',
  },
  {
    id: 5, title: 'Parallel 9', genre_id: 5, genre: 'Sci-Fi',
    year: 2024, rating: 8.8, stock_count: 4,
    duration: '2h 41m', director: 'Yuna Choi',
    description: 'A physicist discovers a way to communicate with alternate versions of herself — but each message reshapes her reality.',
    poster_color: '#040e1a',
    accent: '#4ab8e8',
  },
  {
    id: 6, title: 'Laughing Stock', genre_id: 3, genre: 'Comedy',
    year: 2023, rating: 7.6, stock_count: 7,
    duration: '1h 42m', director: 'Tom Brecht',
    description: 'A stand-up comedian accidentally goes viral for all the wrong reasons and must navigate sudden, chaotic fame.',
    poster_color: '#1a1508',
    accent: '#e8c84a',
  },
  {
    id: 7, title: 'Marrow', genre_id: 6, genre: 'Horror',
    year: 2022, rating: 8.0, stock_count: 1,
    duration: '1h 58m', director: 'Petra Novak',
    description: 'A family moves into a historic estate and slowly realizes the house has been waiting for them.',
    poster_color: '#0a0a0a',
    accent: '#8a4ae8',
  },
  {
    id: 8, title: 'Ember Season', genre_id: 7, genre: 'Romance',
    year: 2024, rating: 7.4, stock_count: 6,
    duration: '1h 49m', director: 'Leila Farouk',
    description: 'Two artists meet at a remote residency and fall in love — but their work demands they live on opposite sides of the world.',
    poster_color: '#1a0c08',
    accent: '#e87a4a',
  },
];

// Simulated fetch functions
export const fetchMovies = ({ genre = null, search = '' } = {}) =>
  new Promise((resolve) => {
    setTimeout(() => {
      let results = [...MOVIES];
      if (genre) results = results.filter((m) => m.genre === genre);
      if (search) results = results.filter((m) =>
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.director.toLowerCase().includes(search.toLowerCase())
      );
      resolve(results);
    }, 400);
  });

export const fetchMovie = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const movie = MOVIES.find((m) => m.id === Number(id));
      movie ? resolve(movie) : reject(new Error('Movie not found'));
    }, 200);
  });
