import { useFetcher } from '@remix-run/react';
import { Fragment } from 'react';
import type { Product } from '@shopify/hydrogen/storefront-api-types';
import type { Wishlist } from '~/lib/type';

import { IconHeartOutline, IconHeartFull } from '~/components';

interface WishlistIconProps {
  wishlist: Wishlist;
  product: Product;
}

export function WishlistIcon({
  product,
  wishlist,
}: {
  product: Product;
  wishlist: Wishlist;
}) {
  const fetcher = useFetcher();

  const found =
    wishlist.products.find((search) => search.shopifyId === product.id) !==
    undefined;

  function handleClick() {
    fetcher.submit(
      { shopifyProductId: product.id, action: found ? 'remove' : 'add' },
      { method: 'post', action: '/wishlist' }
    );
  }

  return (
    <div className="my-2">
      <button onClick={handleClick}>
        {found ? <IconHeartFull /> : <IconHeartOutline />}
      </button>
    </div>
  );
}
