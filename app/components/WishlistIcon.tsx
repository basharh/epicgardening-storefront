import { useFetcher } from '@remix-run/react';
import { Fragment } from 'react';
import type { Product } from '@shopify/hydrogen/storefront-api-types';
import type { Wishlist } from '~/lib/type';

import { IconHeartOutline, IconHeartFull } from '~/components';

interface WishlistIconProps {
  selected: boolean;
  shopifyProductId: string;
}

export function WishlistIcon({
  shopifyProductId,
  selected,
}: WishlistIconProps) {
  const fetcher = useFetcher();

  function handleClick() {
    fetcher.submit(
      { shopifyProductId, action: selected ? 'remove' : 'add' },
      { method: 'post', action: '/wishlist' }
    );
  }

  return (
    <div className="py-2">
      <button onClick={handleClick}>
        {selected ? <IconHeartFull /> : <IconHeartOutline />}
      </button>
    </div>
  );
}
