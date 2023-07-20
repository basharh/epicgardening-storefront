import {
  json,
  type ActionArgs,
  type ActionFunction,
  type LoaderArgs,
} from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { WishlistIcon } from '~/components';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  inWishlist,
} from '~/data/wishlist';

export const action: ActionFunction = async ({
  context,
  request,
}: ActionArgs) => {
  const data = await request.formData();

  const action = data.get('action') as string;
  const shopifyProductId = data.get('shopifyProductId') as string;

  if (action === 'add') {
    console.log('adding:', shopifyProductId);
    await addToWishlist(shopifyProductId);
  } else if (action === 'remove') {
    console.log('removing', shopifyProductId);
    await removeFromWishlist(shopifyProductId);
  }

  return null;
};

export async function loader({ params, request, context }: LoaderArgs) {
  const wishlist = await getWishlist();

  return json({
    wishlist,
  });
}

export default function Wishlist() {
  const { wishlist } = useLoaderData<typeof loader>();

  return (
    <div className="m-6">
      {wishlist.products.map((product) => {
        return (
          <div className="flex items-center">
            <div className="p-2">{product.shopifyId}</div>
            <WishlistIcon
              selected={inWishlist(wishlist, product.shopifyId)}
              shopifyProductId={product.shopifyId}
            />
          </div>
        );
      })}
    </div>
  );
}
