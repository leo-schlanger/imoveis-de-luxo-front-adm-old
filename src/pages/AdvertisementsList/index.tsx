import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';

import './styles.css';

interface Advertisement {
  id: string;
  title: string;
  type: string;
  status: boolean;
  property: {
    type: string;
  };
  user: {
    name: string;
  };
}

interface IQueryData {
  advertisements: Advertisement[];
}

const FIND_ADVERTISEMENTS = gql`
  query findAdvertisements($per_page: Int, $page: Int) {
    advertisements(data: { per_page: $per_page, page: $page }) {
      id
      title
      type
      property {
        type
      }
      user {
        name
      }
    }
  }
`;

const AdvertisementsList: React.FC = () => {
  const { data, loading, error } = useQuery<IQueryData>(FIND_ADVERTISEMENTS, {
    variables: {
      per_page: 20,
      page: 1,
    },
  });

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
          <th>Título</th>
          <th>Tipo de anúncio</th>
          <th>Tipo da propriedade</th>
          <th>Nome do anunciante</th>
          <th>Status</th>
          <th>Opções</th>
        </tr>
        {data &&
          data.advertisements.map((advertisement) => (
            <tr>
              <td>{advertisement.id}</td>
              <td>{advertisement.title}</td>
              <td>{advertisement.type}</td>
              <td>{advertisement.property.type}</td>
              <td>{advertisement.user.name}</td>
              <td>{advertisement.status ? 'Ativo' : 'Inativo'}</td>
              <td className="table-options">
                <Link to={`/advertisements/${advertisement.id}`}>
                  <FiEdit />
                </Link>
                <FiTrash />
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default AdvertisementsList;
