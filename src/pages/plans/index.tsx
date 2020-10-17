import { useMutation, useQuery } from '@apollo/react-hooks';
import { Box, Flex, Heading, IconButton } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AlertDialog from '../../components/AlertDialog';
import {
  Table,
  TableColumnField,
  TableColumnHeader,
  TablePagination,
  TableRows,
  TableRowsSkeleton,
} from '../../components/Table';
import TopNavigation from '../../components/TopNavigation';
import {
  DELETE_PLAN,
  FIND_PLANS,
  IQueryPlansListData,
} from '../../libs/gql/plans';

const headers = ['Nome', 'Preço', 'Opções'];

export default function Plans(): JSX.Element {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(20);
  const [modalDeleteView, setModalDeleteView] = useState(false);
  const [selected, setSelected] = useState('');

  const router = useRouter();
  const { data, loading, error, refetch } = useQuery<IQueryPlansListData>(
    FIND_PLANS,
    {
      variables: {
        per_page,
        page,
      },
    },
  );
  const [deleteUser] = useMutation(DELETE_PLAN);

  if (error) {
    return (
      <Heading as="h1" fontWeight="400">
        Erro no carregamento da página. Tente novamente.
      </Heading>
    );
  }

  async function handleDelete(): Promise<void> {
    await deleteUser({ variables: { selected } });
    refetch();
    setModalDeleteView(false);
  }

  return (
    <Flex
      as="main"
      height="100vh"
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="column"
    >
      <TopNavigation />
      <Box marginTop="8px">
        <Heading as="h1" fontWeight="400" marginBottom="8px">
          Planos
        </Heading>
      </Box>
      <Table>
        <TableRows columns={headers.length}>
          {headers.map((element) => (
            <TableColumnHeader>{element}</TableColumnHeader>
          ))}

          {!loading ? (
            data.plans.map((plan) => {
              return (
                <>
                  <TableColumnField>{plan.name}</TableColumnField>
                  <TableColumnField>{plan.value}</TableColumnField>
                  <TableColumnField justifyContent="flex-end" padding="4px">
                    <IconButton
                      icon="edit"
                      size="lg"
                      backgroundColor="transparent"
                      _hover={{ color: 'blue.600' }}
                      _focus={null}
                      aria-label="Editar usuário"
                      onClick={() => {
                        router.push(`/plans/${plan.id}`);
                      }}
                    />
                    <IconButton
                      icon="delete"
                      size="lg"
                      backgroundColor="transparent"
                      _hover={{ color: 'red.600' }}
                      _focus={null}
                      aria-label="Deletar usuário"
                      onClick={() => {
                        setSelected(plan.id);
                        setModalDeleteView(true);
                      }}
                    />
                  </TableColumnField>
                </>
              );
            })
          ) : (
            <TableRowsSkeleton columns={headers.length} rows={per_page} />
          )}
        </TableRows>
        {!loading && (
          <TablePagination
            page={page}
            setPage={setPage}
            paginationValue={per_page}
            pagination={[15, 20, 30, 50]}
            onChangeSelect={(e) => {
              setPerPage(Number(e.target.value));
            }}
            total={data.plans.length}
          />
        )}
      </Table>

      <AlertDialog
        title="Deletar Usuário do sistema"
        body="Você tem certeza que deseja deleta esse usuário?"
        cancelButtonText="Cancelar"
        approveButtonText="Deletar"
        isOpen={modalDeleteView}
        onClose={() => setModalDeleteView(false)}
        onApprove={handleDelete}
      />
    </Flex>
  );
}
