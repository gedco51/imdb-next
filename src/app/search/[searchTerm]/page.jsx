import Results from '@/components/results';
import { Suspense } from 'react';


function fetchData(searchTerm) {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${searchTerm}&language=en-US&page=1&include_adult=false`
  ).then(res => res.json());
}

export default function SearchPage({ params }) {
  const searchTerm = params.searchTerm;

  // Use React suspense for data fetching
  const data = fetchData(searchTerm);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {data && data.results && data.results.length === 0 ? (
          <h1 className='text-center pt-6'>No results found</h1>
        ) : (
          <Results results={data.results} />
        )}
      </Suspense>
    </div>
  );
}

