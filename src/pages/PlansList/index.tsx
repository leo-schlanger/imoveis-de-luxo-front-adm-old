import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { FiEdit, FiTrash } from 'react-icons/fi';

import Header from '../../components/Header';

import './styles.css';

interface Plan {
  id: string;
  name: string;
  value: number;
}

interface IQueryData {
  plans: Plan[];
}

const FIND_PLANS = gql`
  query findPlans {
    plans {
      id
      name
      value
    }
  }
`;

const PlansList: React.FC = () => {
  const { data, loading, error } = useQuery<IQueryData>(FIND_PLANS);

  if (loading) {
    return <h1>Carregando anúncios...</h1>;
  }

  if (error) {
    return (
      <div>
        <h1>Ocorreu um erro ao carregar lista de anúncios</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div id="users-list-container">
      <Header />
      <table className="users-list-table">
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Valor</th>
          <th>Opções</th>
        </tr>
        {data &&
          data.plans.map((plan) => (
            <tr>
              <td>{plan.id}</td>
              <td>{plan.name}</td>
              <td>{plan.value}</td>
              <td className="table-options">
                <FiEdit />
                <FiTrash />
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default PlansList;
