import React, { useEffect, useRef } from 'react';
import useKakaoLoader from "../hooks/useKakaoLoader";

const VitaminKakaoMapsPage = ({ width = '100%', height = '400px' }) => {
    const mapRef = useRef(null);
    const isLoaded = useKakaoLoader();

    useEffect(() => {
        if (!isLoaded || !window.kakao || !window.kakao.maps) return;

        const options = {
            center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 중심 좌표
            level: 3,
        };

        const map = new window.kakao.maps.Map(mapRef.current, options);

        // 마커 추가 예시
        const markerPosition = new window.kakao.maps.LatLng(37.5665, 126.9780);
        const marker = new window.kakao.maps.Marker({
            position: markerPosition,
        });
        marker.setMap(map);

    }, [isLoaded]);

    if(!isLoaded) {
        return <div>지도 로딩중...</div>
    }

    return <div ref={mapRef} style={{ width, height }} />;
};

export default VitaminKakaoMapsPage;