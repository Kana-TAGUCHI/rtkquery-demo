import Link from 'next/link';

const HomePage = () => {
  return (
    <>
      <h1 className='text-3xl'>Home</h1>
      <div className='pt-10'>
        <Link
          href='/recipes'
          className='block bg-sky-700 p-4 font-bold w-38 text-center hover:opacity-70 rounded'
        >
          RECIPES LIST
        </Link>
      </div>
    </>
  );
};

export default HomePage;
