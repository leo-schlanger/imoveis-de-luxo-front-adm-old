import gql from 'graphql-tag';

export const FIND_ADVERTISEMENTS = gql`
  query findAdvertisements($per_page: Int, $page: Int) {
    advertisements(data: { per_page: $per_page, page: $page }) {
      list {
        id
        title
        type
        property {
          type
        }
        user {
          name
        }
      }
      total
    }
  }
`;

export const DELETE_ADVERTISEMENT = gql`
  mutation deleteAdvertisement($id: String!) {
    deleteAdvertisement(id: $id)
  }
`;

export const FIND_USERS = gql`
  query findUsers($per_page: Int, $page: Int) {
    users(data: { per_page: $per_page, page: $page }) {
      list {
        id
        name
        email
        type
        status
      }
      total
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id)
  }
`;

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
