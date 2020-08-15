import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import { FIND_USERS } from '../../utils/graphqlCommands';

import Header from '../../components/Header';

import './styles.css';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'new' | 'active' | 'inactive';
  type: 'adm' | 'advertiser' | 'user';
}

interface IQueryData {
  users: {
    list: User[];
    total: number;
  };
}

const UsersList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(20);

  const { data, loading, error } = useQuery<IQueryData>(FIND_USERS, {
    variables: {
      per_page,
      page,
    },
  });

  if (loading) {
    return <h1>Carregando usuários...</h1>;
  }

  if (error) {
    return (
      <div>
        <h1>Ocorreu um erro ao carregar lista de usuários</h1>
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
              data.users.list.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.type}</td>
                  <td>{user.status}</td>
                  <td className="table-options">
                    <div>
                      <Link to={`/users/${user.id}`}>
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
        <div>
          <button
            disabled={page === 1}
            type="button"
            onClick={() => setPage((status) => status - 1)}
          >
            <FiArrowLeft size={24} />
          </button>
          <div>{data && <p>{data.users.total}</p>}</div>
          <button
            disabled={!data || page >= data.users.total / per_page}
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

export default UsersList;
