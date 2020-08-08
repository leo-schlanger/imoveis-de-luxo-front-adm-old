import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { FiEdit, FiTrash } from 'react-icons/fi';

import './styles.css';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'new' | 'active' | 'inactive';
  type: 'adm' | 'advertiser' | 'user';
}

interface IQueryData {
  users: User[];
}

const FIND_USERS = gql`
  query findUsers($per_page: Int, $page: Int) {
    users(data: { per_page: $per_page, page: $page }) {
      id
      name
      email
      type
      status
    }
  }
`;

const UsersList: React.FC = () => {
  const { data, loading, error } = useQuery<IQueryData>(FIND_USERS, {
    variables: {
      per_page: 20,
      page: 1,
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
      <table className="users-list-table">
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Tipo</th>
          <th>Status</th>
          <th>Opções</th>
        </tr>
        {data &&
          data.users.map((user) => (
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.type}</td>
              <td>{user.status}</td>
              <td className="table-options">
                <Link to={`/users/${user.id}`}>
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

export default UsersList;
