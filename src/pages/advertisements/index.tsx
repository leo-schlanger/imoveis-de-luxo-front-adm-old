import { useMutation, useQuery } from '@apollo/react-hooks';
import { Box, Flex, Heading, IconButton, Tag } from '@chakra-ui/core';
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
  DELETE_ADVERTISEMENT,
  FIND_ADVERTISEMENTS,
  IQueryAdvertisementsListData,
} from '../../libs/gql/advertisements';

const headers = [
  'id',
  'Título',
  'Tipo de anúncio',
  'Tipo de propriedade',
  'Anunciante',
  'Status',
  'Opções',
];

export default function Advertisements(): JSX.Element {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(20);
  const [modalDeleteView, setModalDeleteView] = useState(false);
  const [selected, setSelected] = useState('');

  const router = useRouter();
  const { data, loading, error, refetch } = useQuery<
    IQueryAdvertisementsListData
  >(FIND_ADVERTISEMENTS, {
    variables: {
      per_page,
      page,
    },
  });
  const [deleteAdvertisements] = useMutation(DELETE_ADVERTISEMENT);

  if (error) {
    return (
      <Heading as="h1" fontWeight="400">
        Erro no carregamento da página. Tente novamente.
      </Heading>
    );
  }

  async function handleDelete(): Promise<void> {
    await deleteAdvertisements({ variables: { selected } });
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
          Anúncios
        </Heading>
      </Box>
      <Table>
        <TableRows columns={headers.length}>
          {headers.map((element) => (
            <TableColumnHeader>{element}</TableColumnHeader>
          ))}

          {!loading ? (
            data.advertisements.list.map((advertisement) => {
              return (
                <>
                  <TableColumnField>{advertisement.id}</TableColumnField>
                  <TableColumnField>{advertisement.title}</TableColumnField>
                  <TableColumnField>{advertisement.type}</TableColumnField>
                  <TableColumnField>
                    {advertisement.property.type}
                  </TableColumnField>
                  <TableColumnField>{advertisement.user.name}</TableColumnField>
                  <TableColumnField>
                    {advertisement.status ? (
                      <Tag size="lg" color="green.600" variantColor="green">
                        Ativo
                      </Tag>
                    ) : (
                      <Tag size="lg" color="red.500" variantColor="red">
                        Inativo
                      </Tag>
                    )}
                  </TableColumnField>
                  <TableColumnField justifyContent="flex-end" padding="4px">
                    <IconButton
                      icon="edit"
                      size="lg"
                      backgroundColor="transparent"
                      _hover={{ color: 'blue.600' }}
                      _focus={null}
                      aria-label="Editar usuário"
                      onClick={() => {
                        router.push(`/advertisements/${advertisement.id}`);
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
                        setSelected(advertisement.id);
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
            total={data.advertisements.total}
          />
        )}
      </Table>

      <AlertDialog
        title="Deletar Anúncio do sistema"
        body="Você tem certeza que deseja deleta esse anúncio?"
        cancelButtonText="Cancelar"
        approveButtonText="Deletar"
        isOpen={modalDeleteView}
        onClose={() => setModalDeleteView(false)}
        onApprove={handleDelete}
      />
    </Flex>
  );
}