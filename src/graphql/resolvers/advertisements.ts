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
