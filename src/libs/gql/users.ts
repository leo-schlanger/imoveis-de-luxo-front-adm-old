import gql from 'graphql-tag';
import { User } from '../entities/user';

export interface IQueryUsersListData {
  users: {
    list: User[];
    total: number;
  };
}

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
