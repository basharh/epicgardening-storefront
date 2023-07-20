import { GraphQLClient, gql } from 'graphql-request';
import type { Wishlist } from '~/lib/type';

export async function addToWishlist(
  shopifyProductId: string
): Promise<Wishlist> {
  const client = new GraphQLClient('http://localhost:4000/graphql', {
    fetch: fetch,
  });

  const res = (await client.request(
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
  )) as { wishlist: Wishlist };
  //.then((result) => console.dir(result, { depth: null }));

  return res.wishlist;
}

export async function removeFromWishlist(shopifyProductId: string) {
  const client = new GraphQLClient('http://localhost:4000/graphql', {
    fetch: fetch,
  });

  const res = (await client.request(
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
  )) as { wishlist: Wishlist };
  //.then((result) => console.dir(result, { depth: null }));
}

export async function getWishlist() {
  const client = new GraphQLClient('http://localhost:4000/graphql', {
    fetch: fetch,
  });

  const res = (await client.request(
    gql`
      query GetWishlist {
        wishlist {
          id
          products {
            id
            shopifyId
          }
        }
      }
    `
  )) as { wishlist: Wishlist };

  return res.wishlist;
  //.then((res) => console.dir(res, { depth: null }));
}

export function inWishlist(wishlist: Wishlist, shopifyProductId: string) {
  return (
    wishlist.products.find(
      (search) => search.shopifyId === shopifyProductId
    ) !== undefined
  );
}
