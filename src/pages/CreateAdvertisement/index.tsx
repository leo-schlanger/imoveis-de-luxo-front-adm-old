import React, { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import { CREATE_ADVERTISEMENT } from '../../graphql/resolvers/advertisements';
import {
  AdvertisementType,
  PropertyType,
  advertisementTypeDescription,
  propertyTypeDescription,
} from '../../graphql/entities/advertisements';
import { schemaCreateAdvertisement } from '../../utils/yupValidations';

import './styles.css';

interface ICreateAdvertisementData {
  title: string;
  description: string;
  type: AdvertisementType;
  type_property: PropertyType;
  value: number;
  country: string;
  state: string;
  postal_code: number;
  neighborhood: string;
  address: string;
  number: number;
  complement: string;
}

const advertisementTypes = ['PURCHASE', 'TENANCY'] as const;

const propertyTypes = [
  'HOME',
  'APARTMENT',
  'PENTHOUSE',
  'GRANGE',
  'FARM',
  'TERRAIN',
  'SHED',
  'CORPORATE',
  'OFFICE',
  'STORE',
  'HOTEL',
  'INN',
  'ISLAND',
  'CUSTOMIZED',
] as const;

const CreateAdvertisement: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<ICreateAdvertisementData>({
    resolver: yupResolver(schemaCreateAdvertisement),
  });
  const [createAdvertisement, { error }] = useMutation(CREATE_ADVERTISEMENT);
  const history = useHistory();

  const onSubmit = useCallback(
    async (data: ICreateAdvertisementData): Promise<void> => {
      try {
        await createAdvertisement({
          variables: {
            ...data,
            value: parseFloat(data.value.toString()),
            status: true,
            address_visible: true,
          },
        });

        history.goBack();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log({ error });
      }
    },
    [createAdvertisement, error, history],
  );

  return (
    <div className="create-advertisement-container">
      <Header />
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="create-advertisement-form"
        >
          <input name="title" placeholder="Título" ref={register} />
          <p>{errors.title?.message}</p>
          <input name="description" placeholder="Descrição" ref={register} />
          <p>{errors.description?.message}</p>
          <select name="type" ref={register}>
            {advertisementTypes.map((item) => {
              return (
                <option value={item}>
                  {advertisementTypeDescription[item]}
                </option>
              );
            })}
          </select>
          <p>{errors.type?.message}</p>
          <select name="type_property" ref={register}>
            {propertyTypes.map((item) => {
              return (
                <option value={item}>{propertyTypeDescription[item]}</option>
              );
            })}
          </select>
          <p>{errors.type_property?.message}</p>
          <input
            ref={register}
            name="value"
            placeholder="Valor"
            type="number"
          />
          <input ref={register} name="country" placeholder="Pais" />
          <p>{errors.country?.message}</p>
          <input ref={register} name="state" placeholder="Estado" />
          <p>{errors.state?.message}</p>
          <input ref={register} name="postal_code" placeholder="CEP" />
          <p>{errors.postal_code?.message}</p>
          <input ref={register} name="neighborhood" placeholder="Bairro" />
          <p>{errors.neighborhood?.message}</p>
          <input ref={register} name="address" placeholder="Endereço" />
          <p>{errors.address?.message}</p>
          <input ref={register} name="number" placeholder="Número" />
          <p>{errors.number?.message}</p>
          <input ref={register} name="complement" placeholder="Complemento" />
          <p>{errors.complement?.message}</p>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdvertisement;
