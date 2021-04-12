import { gql } from '@apollo/client';

const storeCollectionContainer = () => gql`{
    storeCollection {
        items {
          title
          number
          bookerLocationId
          type
          information
          contact
        }
      }    
  }
`;

export default storeCollectionContainer;
