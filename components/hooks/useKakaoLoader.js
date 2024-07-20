import { useEffect, useState } from 'react';

// 카카오 지도 API 를 로드하는 커스텀 훅
function useKakaoLoader() {
  // 로드 완료 상태 관리
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(function loadedHandlerEffect() {
    // 카카오 맵스 sdk 로드되어있는지 확인, 로드되있다면 로드 상태 true
    if (window.kakao && window.kakao.maps) {
      setIsLoaded(true);
      return;
    }

    // 맵스 sdk 를 로드할 스크립트 요소 생성 후 sdk 의 url 에 환경변수에서 가져온 api 키등록
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false`;
    script.async = true;

    // 로드 완료 핸들러(로드완료 후 맵스 사용 준비 완료)
    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsLoaded(true);
      });
    };
    // 생성한 스크립트 요소를 문서 head 에 추가해 로딩 시작
    document.head.appendChild(script);

    // 클린업 함수(언마운트될때 실행될 클리업 함수 반환(추가한 스크립트 요소 제거))
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 로드 완료 상태 반환
  return isLoaded;
}

export default useKakaoLoader;
