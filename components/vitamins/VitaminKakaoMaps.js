import React, { useEffect, useRef } from 'react';
import useKakaoLoader from '../hooks/useKakaoLoader';

/*컴포넌트는 Kakao Maps SDK의 로드 상태를 확인하고,
 *로드가 완료되면 지정된 위치에 지도를 렌더링함
 *또한 지도 중심에 마커를 추가하여 특정 위치를 표시*/
const VitaminKakaoMaps = ({ width = '100%', height = '400px' }) => {
  const mapRef = useRef(null);
  const isLoadedKakaoMaps = useKakaoLoader();

  // isLoadedKakaoMaps 의 상태 변화에 따라 실행되는 효과
  useEffect(() => {
    // 카카오 맵스 sdk 가 로드되지 않았거나, sdk 객체가 없다면 함수 종료
    if (!isLoadedKakaoMaps || !window.kakao || !window.kakao.maps) return;

    // 지도 옵션 설정
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 중심 좌표
      level: 3,
    };

    // 지도생성(카카오 맵스 객체 생성하고 mapRef 로 참조된 dom 요소에 지도 렌더링)
    const map = new window.kakao.maps.Map(mapRef.current, options);

    // 마커 추가 (서울 중심 시청 좌표 위치에 마커 생성)
    const markerPosition = new window.kakao.maps.LatLng(37.5665, 126.978);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, [isLoadedKakaoMaps]);

  // 지도 로드되지않았을 때 로딩중 표시
  if (!isLoadedKakaoMaps) {
    return <div>지도 로딩중...</div>;
  }

  return <div ref={mapRef} style={{ width, height }} />;
};

export default VitaminKakaoMaps;
