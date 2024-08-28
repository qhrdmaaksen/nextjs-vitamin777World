import { atom } from 'recoil';
import { v1 } from 'uuid';

const RightBannerImages = [
  '/util/3d-delicious-seasonal-fruits_23-2151046863.jpg',
  '/util/close-up-citrus-sesonal-fruits-winter_23-2151035447.jpg',
  '/util/close-up-futuristic-soft-drink_23-2151281958.jpg',
];

// LeftBannerImages 는 이미지의 경로를 담은 배열
const LeftBannerImages = [
  '/util/raw-foodstuff-with-water-drops-studio_23-2151364890.jpg',
  '/util/view-abstract-fluid-monochrome-palette_23-2150635178.jpg',
  '/util/bottle-lemons-lemons-grapefruit-are-displayed-white-background_772785-16214.jpg',
];

// atom : 상태의 단위, 업데이트와 구독이 가능
export const leftCurrentSlideImageState = atom({
  key: `leftCurrentSlideImageState${v1()}`,
  default: 0,
});

export const rightCurrentSlideImageState = atom({
  key: `rightCurrentSlideImageState${v1()}`,
  default: 0,
});

export const rightSlideImageState = atom({
  key: `rightSlideImageState${v1()}`,
  default: RightBannerImages,
});

export const leftSlideImageState = atom({
  key: `leftSlideImageState${v1()}`,
  default: LeftBannerImages,
});

export const isLoggedInState = atom({
  key: `isLoggedInState${v1()}`,
  default: false,
});

export const isTouchMenuState = atom({
  key: `isTouchMenuState${v1()}`,
  default: false,
});

export const noticeModalShowState = atom({
  key: `noticeModalShowState${v1()}`,
  default: false,
});

export const isLoadedState = atom({
  key: `isLoadedState${v1()}`,
  default: false,
});

export const searchTermState = atom({
  key: `searchTermState${v1()}`,
  default: '',
})

export const isLoadingState = atom({
  key: `isLoadingState${v1()}`,
  default: false,
})

export const errorMessageState = atom({
  key: `errorMessageState${v1()}`,
  default: '',
})
