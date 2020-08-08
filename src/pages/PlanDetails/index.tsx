import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import Header from '../../components/Header';

interface Plan {
  id: string;
  name: string;
  description: string;
  quantity_properties: number;
  quantity_photos: number;
  quantity_videos: number;
  value: number;
  created_at: Date;
  updated_at: Date;
}

const PlanDetails: React.FC = () => {
  const [plan, setPlan] = useState<Plan>();
  const { id } = useParams();

  useEffect(() => {
    api.get(`plans/${id}`).then((response) => setPlan(response.data));
  }, [id]);

  return (
    <div>
      <Header />
      <h1>params id: {id}</h1>
      <h1>{plan?.name}</h1>
      <h1>{plan?.value}</h1>
      <h1>{plan?.id}</h1>
    </div>
  );
};

export default PlanDetails;
