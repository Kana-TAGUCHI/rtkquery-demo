'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useGetRecipesQuery } from '@/app/rtk/api/server';

const RecipesPage = () => {
  const { data, isLoading, isFetching } = useGetRecipesQuery();
  return (
    <>
      <h1 className='text-3xl font-bold'>Recipes List</h1>
      <div className='w-full text-right pt-10'>
        <Link
          href='/recipes/new'
          className='inline-block bg-amber-700 p-2 text-center hover:opacity-70 rounded font-semibold'
        >
          CREATE RECIPE
        </Link>
      </div>

      {isLoading || isFetching || !data ? (
        <div className='flex flex-grow'>
          <Image
            src={'/images/loading.svg'}
            alt={'loading'}
            height={100}
            width={100}
            className='animate-spin-slow'
          />
        </div>
      ) : (
        <div className='flex flex-col gap-14 pt-10'>
          {data.map((item) => (
            <div key={item.id} className='flex flex-col gap-2'>
              {item.picture && (
                <Image
                  src={item.picture}
                  width={640}
                  height={136}
                  alt={item.title}
                />
              )}
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <p>{item.description}</p>

              <Link
                href={`/recipes/${item.id}`}
                className='block bg-sky-700 p-4 font-bold w-32 text-center hover:opacity-70 rounded-sm'
              >
                GET RECIPE
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default RecipesPage;
