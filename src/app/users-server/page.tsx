type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

export default async function UsersServer() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();

  return (
    <ul className='space-y-4 p-4'>
      {users.map((user: User) => (
        <li
          key={user.id}
          className='rounded-lg bg-blue-300 p-4 text-gray-700 shadow-md'
        >
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
}
