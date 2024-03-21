import { Suspense } from 'react';
import Image from 'next/image';

async function fetchMovieData(movieId) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`
  );
  return res.json();
}

export default function MoviePage({ params }) {
  const movieId = params.id;

  // Use React suspense for data fetching
  const moviePromise = fetchMovieData(movieId);

  return (
    <div className='w-full'>
      <Suspense fallback={<div>Loading...</div>}>
        <MovieContent moviePromise={moviePromise} />
      </Suspense>
    </div>
  );
}

async function MovieContent({ moviePromise }) {
  const movie = await moviePromise;

  return (
    <div className='p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6'>
      <Image
        src={`https://image.tmdb.org/t/p/original/${
          movie.backdrop_path || movie.poster_path
        }`}
        width={500}
        height={300}
        className='rounded-lg'
        style={{ maxWidth: '100%', height: '100%' }}
      ></Image>
      <div className='p-2'>
        <h2 className='text-lg mb-3 font-bold'>
          {movie.title || movie.name}
        </h2>
        <p className='text-lg mb-3'>{movie.overview}</p>
        <p className='mb-3'>
          <span className='font-semibold mr-1'>Date Released:</span>
          {movie.release_date || movie.first_air_date}
        </p>
        <p className='mb-3'>
          <span className='font-semibold mr-1'>Rating:</span>
          {movie.vote_count}
        </p>
      </div>
    </div>
  );
}
