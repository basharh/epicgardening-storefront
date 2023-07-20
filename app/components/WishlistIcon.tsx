import { Fragment, useState } from 'react';

import { IconHeartOutline, IconHeartFull } from '~/components';
interface WishlistIconProps {}

export function WishlistIcon() {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen((open) => !open);
  }

  return (
    <div className="my-2">
      <button onClick={handleClick}>
        {open ? <IconHeartOutline /> : <IconHeartFull />}
      </button>
    </div>
  );
}
