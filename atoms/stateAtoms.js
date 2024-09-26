import { atom } from 'recoil';
import { v1 } from 'uuid';

const RightBannerImages = [
  '/utils/3619157.jpg',
  '/utils/3630316.jpg',
  '/utils/3638893.jpg',
  '/utils/3774814.jpg',
];

// LeftBannerImages 는 이미지의 경로를 담은 배열
const LeftBannerImages = [
  '/utils/3651947.jpg',
  '/utils/3651960.jpg',
  '/utils/3667455.jpg',
  '/utils/3774920.jpg',
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
});

export const isLoadingState = atom({
  key: `isLoadingState${v1()}`,
  default: false,
});

export const errorMessageState = atom({
  key: `errorMessageState${v1()}`,
  default: '',
});

export const formDataState = atom({
  key: `formDataState${v1()}`,
  default: {
    image: '',
    title: '',
    address: '',
    description: '',
  },
});

export const showModalState = atom({
  key: `modalShowState${v1()}`,
  default: false,
});
