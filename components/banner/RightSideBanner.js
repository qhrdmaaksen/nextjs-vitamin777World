import { useEffect } from 'react';
import classes from './RightSideBanner.module.css';
import {
  rightCurrentSlideImageState,
  rightSlideImageState,
} from '../../atoms/stateAtoms';
import { useRecoilState, useRecoilValue } from 'recoil';

// Props 로 들어올 BannerImages 는 이미지의 경로를 담은 배열
// interval 은 이미지가 전환되는 시간 간격을 나타냄

const RightSideBanner = ({ interval }) => {
  {
    const [currentSlideImage, setCurrentSlideImage] = useRecoilState(
      rightCurrentSlideImageState,
    );
    // rightSlideImageState 는 atoms 폴더의 stateAtoms.js 에서 정의한 rightSlideImageState 를 가져옴
    const RightBannerImages = useRecoilValue(rightSlideImageState);

    // useEffect 를 이용하여 interval 마다 currentSlideImage 를 변경
    useEffect(() => {
      const rightNextSlideTimer = setInterval(() => {
        setCurrentSlideImage(
          (prevImage) => (prevImage + 1) % RightBannerImages.length,
        );
      }, interval);

      // 컴포넌트가 unmount 되면 interval 을 clear 해줘서 메모리 누수 방지
      return () => {
        clearInterval(rightNextSlideTimer);
      };
    }, [RightBannerImages.length, interval]);

    return (
      <div className={classes.sideBanner}>
        <div className={classes.bannerContent}>
          {RightBannerImages.map((bannerImage, index) => (
            <img
              key={index}
              src={bannerImage}
              alt={`Slide ${index}`}
              style={{
                display: index === currentSlideImage ? 'block' : 'none',
              }}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default RightSideBanner;
