import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Modal, Button, Table } from 'rsuite';

import Header from '../../components/Header';

import { DELETE_PLAN, FIND_PLANS } from '../../graphql/resolvers/plans';

import '../../assets/styles/rsuite-custom.css';
import '../../components/Table/styles.css';
import './styles.css';

interface Plan {
  id: string;
  name: string;
  value: number;
}

interface IQueryData {
  plans: Plan[];
}

const { Column, HeaderCell, Cell } = Table;

const PlansList: React.FC = () => {
  const [modalDeleteView, setModalDeleteView] = useState(false);
  const [selected, setSelected] = useState('');

  const { data, loading, error, refetch } = useQuery<IQueryData>(FIND_PLANS);
  const [deletePlan] = useMutation(DELETE_PLAN);

  const handleDelete = async (id: string): Promise<void> => {
    await deletePlan({ variables: { id } });
    refetch();
    setModalDeleteView(false);
  };

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
      <div className="list-table">
        <Table
          width={window.innerWidth * 0.9}
          loading={loading}
          data={data?.plans}
          hover={false}
        >
          <Column flexGrow={2} align="center" fixed>
            <HeaderCell
              style={{
                background: 'var(--color-primary-900)',
                fontSize: 16,
                fontFamily: 'Roboto',
                color: 'var(--color-primary-200)',
              }}
            >
              Id
            </HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column flexGrow={2} fixed>
            <HeaderCell
              style={{
                background: 'var(--color-primary-900)',
                fontSize: 16,
                fontFamily: 'Roboto',
                color: 'var(--color-primary-200)',
              }}
            >
              Nome
            </HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell
              style={{
                background: 'var(--color-primary-900)',
                fontSize: 16,
                fontFamily: 'Roboto',
                color: 'var(--color-primary-200)',
              }}
            >
              Preço
            </HeaderCell>
            <Cell dataKey="value" />
          </Column>

          <Column flexGrow={1} fixed="right">
            <HeaderCell
              style={{
                background: 'var(--color-primary-900)',
                fontSize: 16,
                fontFamily: 'Roboto',
                color: 'var(--color-primary-200)',
              }}
            >
              Opções
            </HeaderCell>

            <Cell>
              {(rowData: Plan) => (
                <div className="table-options">
                  <Link to={`/plans/${rowData.id}`}>
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
              )}
            </Cell>
          </Column>
        </Table>
      </div>
      <Modal
        backdrop="static"
        show={modalDeleteView}
        onHide={() => setModalDeleteView(false)}
        size="xs"
      >
        <Modal.Body style={{ color: 'black' }}>
          Deseja remover esse plano do sistema?
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

export default PlansList;
