'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import { useGetRecipeQuery } from '@/app/rtk/api/server';

const RecipePage = () => {
  const params = useParams();
  const { data, isLoading, isFetching } = useGetRecipeQuery(Number(params.id));

  return (
    <>
      <h1 className='text-3xl font-bold'>Recipe Details</h1>
      <div className='w-full text-right pt-10'>
        <Link
          href={`/recipes/${params.id}/update`}
          className='inline-block bg-sky-700 p-4 font-bold w-38 text-center hover:opacity-70 rounded-sm'
        >
          UPDATE RECIPE
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
        <div className='flex flex-col gap-8 pt-10'>
          <h2 className='font-bold text-lg'>{data.title}</h2>
          {data.picture && (
            <Image
              src={data.picture}
              width={640}
              height={136}
              alt={data.title}
            />
          )}
          <p>{data.description}</p>
        </div>
      )}

      <div className='w-full mt-10'>
        <Link href='/recipes' className='hover:opacity-70'>
          ← Back to Recipes List
        </Link>
      </div>
    </>
  );
};

export default RecipePage;
