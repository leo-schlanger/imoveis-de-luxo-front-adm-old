import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import './styles.css';

const Header: React.FC = () => {
  const { signOut } = useAuth();

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <header id="header-container">
      <ul>
        <li>
          <Link to="/users">Lista de usuários</Link>
        </li>
        <li>
          <Link to="/advertisements">Lista de anúncios</Link>
        </li>
        <li>
          <Link to="/plans">Lista de planos</Link>
        </li>
        <li className="logout-field">
          <button type="button" onClick={handleSignOut}>
            <FiLogOut />
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
