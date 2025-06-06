'use client';

import { useRouter } from 'next/navigation';

export default function About() {
  const router = useRouter();

  return (
    <div>
      <h1>About Us</h1>
      <button
        onClick={() => router.push('/')}
        className='rounded-md bg-blue-500 p-2 text-white'
      >
        Go home
      </button>
    </div>
  );
}
