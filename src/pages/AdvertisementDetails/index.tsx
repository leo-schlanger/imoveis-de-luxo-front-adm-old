import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import Header from '../../components/Header';
import { IAdvertisement } from '../../graphql/entities/advertisements';
import { FIND_ADVERTISEMENT_BY_ID } from '../../graphql/resolvers/advertisements';

import './styles.css';

interface IQueryData {
  getAdvertisementById: IAdvertisement;
}

const AdvertisementDetails: React.FC = () => {
  const [advertisement, setAdvertisement] = useState<IAdvertisement>();
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery<IQueryData>(FIND_ADVERTISEMENT_BY_ID, {
    variables: { id },
  });

  useEffect(() => {
    setAdvertisement(data?.getAdvertisementById);
  }, [data]);

  return (
    <div className="advertisement-details-container">
      <Header />
      <h1>params id: {id}</h1>
      <h1>{advertisement?.title}</h1>
      <h1>{advertisement?.user.name}</h1>
      <h1>{advertisement?.id}</h1>
    </div>
  );
};

export default AdvertisementDetails;
