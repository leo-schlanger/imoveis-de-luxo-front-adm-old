import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import api, { Advertisement } from '../../services/api';

import './styles.css';
import Header from '../../components/Header';

const AdvertisementDetails: React.FC = () => {
  const [advertisement, setAdvertisement] = useState<Advertisement>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    api
      .get(`advertisements/${id}`)
      .then((response) => setAdvertisement(response.data));
  }, [id]);

  return (
    <div>
      <Header />
      <h1>params id: {id}</h1>
      <h1>{advertisement?.title}</h1>
      <h1>{advertisement?.user.name}</h1>
      <h1>{advertisement?.id}</h1>
    </div>
  );
};

export default AdvertisementDetails;
