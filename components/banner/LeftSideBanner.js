import { useEffect } from 'react';
import classes from './LeftSideBanner.module.css';
import {
  leftCurrentSlideImageState,
  leftSlideImageState,
} from '../../atoms/stateAtoms';
import { useRecoilState, useRecoilValue } from 'recoil';

// Props 로 들어올 BannerImages 는 이미지의 경로를 담은 배열
// interval 은 이미지가 전환되는 시간 간격을 나타냄

const LeftSideBanner = ({ interval }) => {
  {
    // currentSlideImage 는 현재 보여지는 이미지의 index 를 나타냄
    const [currentSlideImage, setCurrentSlideImage] = useRecoilState(
      leftCurrentSlideImageState,
    );
    const LeftBannerImages = useRecoilValue(leftSlideImageState);

    // useEffect 를 이용하여 interval 마다 currentSlideImage 를 변경
    useEffect(() => {
      const leftNextSlideTimer = setInterval(() => {
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
      <div className={classes.sideBanner}>
        <div className={classes.bannerContent}>
          {LeftBannerImages.map((bannerImage, index) => (
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

export default LeftSideBanner;
