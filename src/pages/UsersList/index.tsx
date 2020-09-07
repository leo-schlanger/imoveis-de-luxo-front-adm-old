import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Modal, Button } from 'rsuite';

import {
  FIND_USERS,
  DELETE_USER,
  IQueryUsersListData,
} from '../../graphql/resolvers/users';

import Header from '../../components/Header';
import Table from '../../components/Table';

import './styles.css';
import { IUser } from '../../graphql/entities/user';

const UsersList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(20);
  const [modalDeleteView, setModalDeleteView] = useState(false);
  const [selected, setSelected] = useState('');

  const { data, loading, error, refetch } = useQuery<IQueryUsersListData>(
    FIND_USERS,
    {
      variables: {
        per_page,
        page,
      },
    },
  );
  const [deleteUser] = useMutation(DELETE_USER);

  const handleChangePage = (newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeLength = (newPerPage: number): void => {
    setPerPage(newPerPage);
  };

  const handleDelete = async (id: string): Promise<void> => {
    await deleteUser({ variables: { id } });
    refetch();
    setModalDeleteView(false);
  };

  const userFields = [
    { dataKey: 'id', display: 'Id', flexGrow: 3 },
    { dataKey: 'name', display: 'Nome', flexGrow: 2 },
    { dataKey: 'email', display: 'E-mail', flexGrow: 2 },
    { dataKey: 'status', display: 'Status', flexGrow: 1 },
    { dataKey: 'type', display: 'Tipo', flexGrow: 1 },
    {
      body: (rowData: IUser) => (
        <div className="table-options">
          <Link to={`/users/${rowData.id}`}>
            <FiEdit />
          </Link>
          <button
            type="button"
            onClick={() => {
              setSelected(rowData.id);
              setModalDeleteView(true);
            }}
          >
            <FiTrash />
          </button>
        </div>
      ),
      display: 'Opções',
      flexGrow: 1,
    },
  ];

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
      <Link to="create-users">Cria novo usuário</Link>
      <Table
        list={data?.users.list}
        total={data?.users.total}
        loading={loading}
        page={page}
        perPage={per_page}
        fields={userFields}
        handleChangePage={handleChangePage}
        handleChangeLength={handleChangeLength}
      />
      <Modal
        backdrop="static"
        show={modalDeleteView}
        onHide={() => setModalDeleteView(false)}
        size="xs"
      >
        <Modal.Body style={{ color: 'black' }}>
          Deseja remover esse usuário do sistema?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleDelete(selected)} appearance="primary">
            Ok
          </Button>
          <Button onClick={() => setModalDeleteView(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UsersList;
