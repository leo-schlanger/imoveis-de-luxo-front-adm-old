import React, { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import { CREATE_PLAN } from '../../graphql/resolvers/plans';
import { schemaCreatePlan } from '../../utils/yupValidations';

import './styles.css';

interface ICreatePlanData {
  name: string;
  description: string;
  quantity_properties: number;
  quantity_photos: number;
  quantity_videos: number;
  value: number;
}

const CreatePlan: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<ICreatePlanData>({
    resolver: yupResolver(schemaCreatePlan),
  });
  const [createPlan, { error }] = useMutation(CREATE_PLAN);
  const history = useHistory();

  const onSubmit = useCallback(
    async (data: ICreatePlanData): Promise<void> => {
      try {
        console.log(data);
        await createPlan({ variables: { ...data } });

        history.goBack();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log({ error });
      }
    },
    [createPlan, error, history],
  );

  return (
    <div className="create-advertisement-container">
      <Header />
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="create-advertisement-form"
        >
          <input name="name" placeholder="Nome" ref={register} />
          <p>{errors.name?.message}</p>
          <input
            name="description"
            placeholder="Descrição(Opcional)"
            ref={register}
          />
          <p>{errors.description?.message}</p>
          <input
            name="quantity_properties"
            placeholder="Quantidade de imóveis"
            ref={register}
          />
          <p>{errors.quantity_properties?.message}</p>
          <input
            name="quantity_photos"
            placeholder="Quantidade de fotos"
            ref={register}
          />
          <p>{errors.quantity_photos?.message}</p>
          <input
            name="quantity_videos"
            placeholder="Quantidade de vídeos"
            ref={register}
          />
          <p>{errors.quantity_videos?.message}</p>
          <input name="value" placeholder="Preço" ref={register} />
          <p>{errors.value?.message}</p>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlan;
