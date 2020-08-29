import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';

import { FIND_PLANS } from '../../utils/graphqlCommands';

import './styles.css';

interface Plan {
  id: string;
  name: string;
  value: number;
}

interface IQueryData {
  plans: Plan[];
}

const PlansList: React.FC = () => {
  const { data, loading, error } = useQuery<IQueryData>(FIND_PLANS);

  if (loading) {
    return <h1>Carregando planos...</h1>;
  }

  if (error) {
    return (
      <div>
        <h1>Ocorreu um erro ao carregar lista de planos</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div id="plans-list-container">
      <Header />
      <div className="plans-list-table">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Valor</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.plans.map((plan) => (
                <tr key={plan.id}>
                  <td>{plan.id}</td>
                  <td>{plan.name}</td>
                  <td>{plan.value}</td>
                  <td className="table-options">
                    <div>
                      <Link to={`/plans/${plan.id}`}>
                        <FiEdit />
                      </Link>
                      <button type="button" onClick={() => {}}>
                        <FiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlansList;
