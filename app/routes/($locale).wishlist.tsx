import {
  type ActionArgs,
  json,
  type ActionFunction,
} from '@shopify/remix-oxygen';
import { GraphQLClient, gql } from 'graphql-request';

async function addToWishlist(shopifyProductId: string) {
  const client = new GraphQLClient('http://localhost:4000/graphql', {
    fetch: fetch,
  });

  await client.request(
    gql`
      mutation AddProductToWishlist($shopifyId: ID!) {
        addProductToWishlist(shopifyProductId: $shopifyId) {
          id
          products {
            id
          }
        }
      }
    `,
    {
      shopifyId: shopifyProductId,
    }
  );
  //.then((result) => console.dir(result, { depth: null }));
}

async function removeFromWishlist(shopifyProductId: string) {
  const client = new GraphQLClient('http://localhost:4000/graphql', {
    fetch: fetch,
  });

  await client.request(
    gql`
      mutation RemoveProductFromWishlist($shopifyId: ID!) {
        removeProductFromWishlist(shopifyProductId: $shopifyId) {
          id
          products {
            id
          }
        }
      }
    `,
    {
      shopifyId: shopifyProductId,
    }
  );
  //.then((result) => console.dir(result, { depth: null }));
}

export const action: ActionFunction = async ({
  context,
  request,
}: ActionArgs) => {
  const data = await request.formData();

  const action = data.get('action') as string;
  const shopifyProductId = data.get('shopifyProductId') as string;

  console.log('shopifyProductId:', shopifyProductId);
  console.log('action:', action);

  if (action === 'add') {
    console.log('adding:', shopifyProductId);
    await addToWishlist(shopifyProductId);
  } else if (action === 'remove') {
    console.log('removing', shopifyProductId);
    await removeFromWishlist(shopifyProductId);
  }

  return null;
};
