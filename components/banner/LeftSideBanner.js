import { useEffect } from 'react';
import classes from './LeftSideBanner.module.css';
import {
  leftCurrentSlideImageState,
  leftSlideImageState,
} from '../../atoms/stateAtoms';
import { useRecoilState, useRecoilValue } from 'recoil';

// LeftSideBanner 컴포넌트는 슬라이드 배너를 구현합니다.
// interval 은 이미지가 전환되는 시간 간격을 나타냄
const LeftSideBanner = ({ interval }) => {
  {
    // currentSlideImage 는 현재 보여지는 이미지의 index 를 나타냄
    const [currentSlideImage, setCurrentSlideImage] = useRecoilState(
        // Recoil 상태에서 현재 슬라이드 이미지 인덱스를 가져오고 설정
      leftCurrentSlideImageState,
    );

    // Recoil 상태에서 가져온 슬라이드 이미지 경로 배열
    const LeftBannerImages = useRecoilValue(leftSlideImageState);

    // useEffect 를 이용하여 interval 마다 currentSlideImage 를 변경
    useEffect(() => {
      // setInterval 을 사용해 주어진 interval 마다 currentSlideImage 를 업데이트
      const leftNextSlideTimer = setInterval(() => {
        // 이전 이미지 인덱스에 1을 더한 후 이미지 배열의 길이로 나눈 나머지 값을 사용하여 이미지를 순환하도록 설정
        setCurrentSlideImage(
          (prevImage) => (prevImage + 1) % LeftBannerImages.length,
        );
      }, interval);

      // 컴포넌트가 unmount 되면 interval 을 clear 해줘서 메모리 누수 방지
      return () => {
        clearInterval(leftNextSlideTimer);
      };
    }, [LeftBannerImages.length, interval]);

    return (
      <>
        {LeftBannerImages.map((bannerImage, index) => (
          <img
            className={classes.imgClass}
            key={index}
            src={bannerImage}
            alt={`Slide ${index}`}
            style={{
              display: index === currentSlideImage ? 'block' : 'none',
            }}
          />
        ))}
      </>
    );
  }
};

export default LeftSideBanner;
