import { useState } from 'react';

const Auth = ({ onLogin }: { onLogin: (username: string) => void }) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    localStorage.setItem('username', username);
    onLogin(username);
  };

  return (
    <div>
      <h2>Connexion</h2>
      <input
        type="text"
        placeholder="Entrez votre pseudo"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
};

export default Auth;
