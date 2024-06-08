// src/App.tsx
import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Shell from './components/Shell';
import Auth from './components/Auth';
import CryptoList from './components/CryptoList';
import TopThreeHistory from './pages/TopThreeHistory';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import '@mantine/charts/styles.css';
import '@mantine/core/styles.css';
import CryptoDetail from './components/CryptoDetail';

const App: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: username ? <Shell /> : <Auth onLogin={setUsername} />,
      children: [
        { path: '/', element: <CryptoList /> },
        { path: 'top-three-history', element: <TopThreeHistory /> },
        { path: 'crypto/:id', element: <CryptoDetail /> },
      ],
    },
  ]);

  return (
    <MantineProvider>
      <ModalsProvider>
        <RouterProvider router={router} />
      </ModalsProvider>
    </MantineProvider>
  );
};

export default App;
