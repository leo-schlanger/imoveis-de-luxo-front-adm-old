import gql from 'graphql-tag';
import { Plan } from '../entities/plan';

export interface IQueryPlansListData {
  plans: Plan[];
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

export const CREATE_PLAN = gql`
  mutation createPlan(
    $name: String!
    $description: String
    $quantity_properties: Int!
    $quantity_photos: Int!
    $quantity_videos: Int!
    $value: Float!
  ) {
    createPlan(
      data: {
        name: $name
        description: $description
        quantity_properties: $quantity_properties
        quantity_photos: $quantity_photos
        quantity_videos: $quantity_videos
        value: $value
      }
    ) {
      id
    }
  }
`;

export const DELETE_PLAN = gql`
  mutation deletePlan($id: String!) {
    deletePlan(id: $id)
  }
`;
