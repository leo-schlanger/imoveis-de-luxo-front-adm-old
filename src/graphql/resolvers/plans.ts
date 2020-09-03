import gql from 'graphql-tag';
import { IPlan } from '../entities/plan';

export interface IQueryPlansListData {
  plans: IPlan[];
}

export const FIND_PLANS = gql`
  query findPlans {
    plans {
      id
      name
      value
    }
  }
`;

export const DELETE_PLAN = gql`
  mutation deletePlan($id: String!) {
    deletePlan(id: $id)
  }
`;
