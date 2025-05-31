// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      {user ? (
        <pre className="text-sm bg-gray-100 p-2 rounded">{JSON.stringify(user, null, 2)}</pre>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}
