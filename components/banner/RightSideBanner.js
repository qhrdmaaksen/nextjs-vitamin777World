import {useEffect, useState} from "react";
import classes from './RightSideBanner.module.css'

// Props 로 들어올 BannerImages 는 이미지의 경로를 담은 배열
// interval 은 이미지가 전환되는 시간 간격을 나타냄

function RightSideBanner({RightBannerImages, interval = 3000}) {
    {
        const [currentSlideImage, setCurrentSlideImage] = useState(0);

        // useEffect 를 이용하여 interval 마다 currentSlideImage 를 변경
        useEffect(() => {
            const nextSlideTimer = setInterval(() => {
                setCurrentSlideImage(
                    (prevImage) => (prevImage + 1) % RightBannerImages.length,
                );
            }, interval);

            // 컴포넌트가 unmount 되면 interval 을 clear 해줘서 메모리 누수 방지
            return () => {
                clearInterval(nextSlideTimer);
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
                        style={{display: index === currentSlideImage ? "block" : "none"}}
                    />
                ))}
                </div>
            </div>
        );
    }
}

export default RightSideBanner;
