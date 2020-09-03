import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'rsuite';

import Header from '../../components/Header';

import './styles.css';
import Table from '../../components/Table';

import {
  FIND_ADVERTISEMENTS,
  DELETE_ADVERTISEMENT,
  IQueryAdvertisementsListData,
} from '../../graphql/resolvers/advertisements';
import { IAdvertisement } from '../../graphql/entities/advertisements';

const AdvertisementsList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(20);
  const [modalDeleteView, setModalDeleteView] = useState(false);
  const [selected, setSelected] = useState('');

  const { data, loading, error, refetch } = useQuery<
    IQueryAdvertisementsListData
  >(FIND_ADVERTISEMENTS, {
    variables: {
      per_page,
      page,
    },
  });
  const [deleteAdvertisement] = useMutation(DELETE_ADVERTISEMENT);

  const advertisementFields = [
    { dataKey: 'id', display: 'Id', flexGrow: 3 },
    { dataKey: 'title', display: 'Título', flexGrow: 2 },
    { dataKey: 'type', display: 'Tipo de anúncio', flexGrow: 1 },
    {
      body: (rowData: IAdvertisement) => <div>{rowData.property.type}</div>,
      display: 'Tipo de propriedade',
      flexGrow: 1,
    },
    {
      body: (rowData: IAdvertisement) => <div>{rowData.user.name}</div>,
      display: 'Anunciante',
      flexGrow: 1,
    },
    {
      body: (rowData: IAdvertisement) => (
        <div>{rowData.status ? 'Ativo' : 'Inativo'}</div>
      ),
      display: 'Status',
      flexGrow: 1,
    },
    {
      body: (rowData: IAdvertisement) => (
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

  const handleChangePage = (newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeLength = (newPerPage: number): void => {
    setPerPage(newPerPage);
  };

  const handleDelete = async (id: string): Promise<void> => {
    await deleteAdvertisement({ variables: { id } });
    refetch();
    setModalDeleteView(false);
  };

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
      <Link to="create-advertisement">Cria novo anúncio</Link>
      <Table
        list={data?.advertisements.list}
        total={data?.advertisements.total}
        loading={loading}
        page={page}
        perPage={per_page}
        fields={advertisementFields}
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
          Deseja remover esse anúncio do sistema?
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

export default AdvertisementsList;
