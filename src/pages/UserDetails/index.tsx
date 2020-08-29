import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import api, { User } from '../../services/api';

import './styles.css';
import Header from '../../components/Header';

const UserDetails: React.FC = () => {
  const [user, setUser] = useState<User>();
  const { id } = useParams();

  useEffect(() => {
    api.get(`users/${id}`).then((response) => setUser(response.data));
  }, [id]);

  return (
    <div>
      <Header />
      <h1>params id: {id}</h1>
      <h1>{user?.name}</h1>
      <h1>{user?.email}</h1>
      <h1>{user?.id}</h1>
    </div>
  );
};

export default UserDetails;
