import { revalidatePath } from 'next/cache';
import { auth, currentUser } from '@clerk/nextjs/server';

type MockUser = {
  id: number;
  name: string;
};

export default async function UsersServer() {
  const authObj = await auth();
  const userObj = await currentUser();

  console.log({ authObj, userObj });

  const response = await fetch(
    'https://68426a3be1347494c31cb9e1.mockapi.io/users',
  );
  const users = await response.json();

  async function addUser(formData: FormData) {
    'use server';
    const name = formData.get('name');
    const res = await fetch(
      'https://68426a3be1347494c31cb9e1.mockapi.io/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      },
    );
    const newUser = await res.json();
    revalidatePath('/mock-users');
    console.log(newUser);
  }

  return (
    <div className='py-10'>
      <form action={addUser} className='mb-4'>
        <input
          type='text'
          name='name'
          required
          className='mr-2 rounded border border-gray-300 p-2 text-gray-700'
        />
        <button
          type='submit'
          className='rounded bg-blue-500 px-4 py-2 text-white'
        >
          Add User
        </button>
      </form>
      <div className='grid grid-cols-4 gap-4'>
        {users.map((user: MockUser) => (
          <div
            key={user.id}
            className='rounded-lg bg-white p-4 text-gray-700 shadow-md'
          >
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
}
