'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  useGetRecipeQuery,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} from '@/app/rtk/api/server';
import { useDefaultValue } from '@/app/hooks';

type Inputs = {
  title?: string;
  description?: string;
  picture?: string | null;
};

const UpdateRecipePage = () => {
  const router = useRouter();
  const params = useParams();
  const { data, isLoading, isFetching } = useGetRecipeQuery(Number(params.id));
  const [updateRecipe, { isLoading: isUpdating }] = useUpdateRecipeMutation();
  const [deleteRecipe, { isLoading: isDeleting }] = useDeleteRecipeMutation();

  const formMethods = useForm<Inputs>({
    defaultValues: {
      title: data?.title,
      description: data?.description,
      picture: data?.picture,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  useDefaultValue(formMethods, data);

  const handleUpdate: SubmitHandler<Inputs> = async (data) => {
    try {
      await updateRecipe({ id: Number(params.id), body: data }).unwrap();
      router.push(`/recipes/${params.id}`);
    } catch {
      console.error('Update Error');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRecipe(Number(params.id)).unwrap();
      router.push('/recipes');
    } catch {
      console.error('Delete Error');
    }
  };

  return (
    <>
      <h1 className='text-3xl font-bold'>Update Recipe</h1>

      <div className='w-full mt-10'>
        {isLoading || isFetching || !data ? (
          <div className='flex flex-grow justify-center'>
            <Image
              src={'/images/loading.svg'}
              alt={'loading'}
              height={100}
              width={100}
              className='animate-spin-slow'
            />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(handleUpdate)}
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

            <div className='flex mt-10 gap-10 justify-center'>
              <div className='flex flex-col items-center'>
                <button
                  type='submit'
                  disabled={isUpdating}
                  className='bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-40 disabled:cursor-none disabled:hover:bg-sky-700'
                >
                  UPDATE
                </button>
              </div>

              <div>
                <button
                  type='submit'
                  disabled={isDeleting}
                  className='bg-red-600 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-40 disabled:cursor-none disabled:hover:bg-sky-700'
                  onClick={() => handleDelete()}
                >
                  DELETE
                </button>
              </div>
            </div>
          </form>
        )}

        <div className='w-full mt-10'>
          <Link href='/recipes' className='hover:opacity-70'>
            ← Back to Recipes List
          </Link>
        </div>
      </div>
    </>
  );
};

export default UpdateRecipePage;
