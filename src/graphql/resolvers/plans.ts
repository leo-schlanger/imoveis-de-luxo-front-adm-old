import gql from 'graphql-tag';

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
