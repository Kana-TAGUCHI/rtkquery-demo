'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCreateRecipeMutation } from '@/app/rtk/api/server';

type Inputs = {
  title: string;
  description: string;
  picture: string | null;
};

const NewRecipePage = () => {
  const router = useRouter();
  const [createRecipe, { isLoading }] = useCreateRecipeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      createRecipe(data).unwrap();
      router.push('/recipes');
    } catch {
      console.error('Create Error');
    }
  };

  return (
    <>
      <h1 className='text-3xl font-bold'>Create Recipe</h1>
      <div className='w-full pt-10'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-slate-50 shadow-md rounded px-8 pt-6 pb-8 mb-4'
        >
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Title
            </label>
            <input
              {...register('title', { required: true })}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
            />
            {errors.title && (
              <span className='text-red-500'>Title is required</span>
            )}
          </div>

          <div className='mt-8'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Description
            </label>
            <textarea
              {...register('description', { required: true })}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
            />
            {errors.description && (
              <span className='text-red-500'>Description is required</span>
            )}
          </div>

          <div className='mt-8'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Picture
            </label>
            <input
              {...register('picture')}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
            />
          </div>

          <div className='flex flex-col items-center justify-center mt-10'>
            <button
              type='submit'
              disabled={isLoading}
              className='bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-40 disabled:cursor-none disabled:hover:bg-sky-700'
            >
              CREATE
            </button>
          </div>
        </form>

        <div className='w-full mt-10'>
          <Link href='/recipes' className='hover:opacity-70'>
            ← Back to Recipes List
          </Link>
        </div>
      </div>
    </>
  );
};

export default NewRecipePage;
