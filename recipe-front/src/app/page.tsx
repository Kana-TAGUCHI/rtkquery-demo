import Link from 'next/link';

const HomePage = () => {
  return (
    <>
      <h1 className='text-3xl'>Home</h1>
      <div className='pt-10'>
        <Link href='/recipes'>Go to Recipes List</Link>
      </div>
    </>
  );
};

export default HomePage;
