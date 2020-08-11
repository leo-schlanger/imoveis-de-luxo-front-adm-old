import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { FiEdit, FiTrash, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
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
  advertisements: {
    list: Advertisement[];
    total: number;
  };
}

const FIND_ADVERTISEMENTS = gql`
  query findAdvertisements($per_page: Int, $page: Int) {
    advertisements(data: { per_page: $per_page, page: $page }) {
      list {
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
      total
    }
  }
`;

const AdvertisementsList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(20);

  const { data, loading, error } = useQuery<IQueryData>(FIND_ADVERTISEMENTS, {
    variables: {
      per_page,
      page,
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
      <div className="users-list-table">
        <div>
          <p>Quantidade por página:</p>
          <select
            name="per_page"
            id="per_page"
            value={per_page}
            onChange={(event) => {
              setPerPage(parseInt(event.target.value, 10));
              setPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Status</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.advertisements.list.map((advertisement) => (
                <tr key={advertisement.id}>
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
          </tbody>
        </table>
        <div>
          <button
            disabled={page === 1}
            type="button"
            onClick={() => setPage((status) => status - 1)}
          >
            <FiArrowLeft size={24} />
          </button>
          <div>{data && <p>{data.advertisements.total}</p>}</div>
          <button
            disabled={!data || page >= data.advertisements.total / per_page}
            type="button"
            onClick={() => setPage((status) => status + 1)}
          >
            <FiArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementsList;
