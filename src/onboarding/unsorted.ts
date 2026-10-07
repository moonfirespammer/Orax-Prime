import type { CSSProperties } from 'react';
import banner from './assets/orax-banner.webp';

// The Unsorted: the hooded figure from the orax.world painting, every player before the identity test
// (PRODUCT_SPEC §2). Until the class-board-style redraw exists, the crops come from the banner (LANDING_PAGE.md).
export const UNSORTED_FIGURE: CSSProperties = {
  backgroundImage: `url("${banner}")`,
  backgroundSize: '380%',
  backgroundPosition: '46.5% 66%',
};
export const UNSORTED_HEAD: CSSProperties = {
  backgroundImage: `url("${banner}")`,
  backgroundSize: '900%',
  backgroundPosition: '46.5% 42%',
};
