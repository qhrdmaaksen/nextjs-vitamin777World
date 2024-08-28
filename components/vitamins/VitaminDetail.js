import classes from './VitaminDetail.module.css';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { errorMessageState, isLoadingState } from '../../atoms/stateAtoms';

const VitaminDetail = ({ isLoggedIn, ...props }) => {
  const vitaminData = props;
  console.log('vitaminData: ', props);
  console.log('isLoggedIn: ', isLoggedIn);
  const router = useRouter();
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);

  const handleItemDelete = async () => {
    console.log('vitaminData id check: ', vitaminData.id);
    setIsLoading(true);
    setErrorMessage('');

    // id 유효성 검사
    if (!vitaminData.id) {
      console.error('유효하지 않은 id 값');
      setErrorMessage('유효하지 않은 id 값');
      setIsLoading(false);
      return;
    }

    try {
      // 삭제 요청 보내기
      const response = await fetch(
        `http://localhost:3000/api/deleteVitamin?id=${vitaminData.id}`,
        {
          method: 'DELETE',
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '삭제 api 요청 실패');
      }

      console.log('비타민 아이템 삭제 완료');

      // 삭제 후 홈으롱 이동
      await router.push('/');
    } catch (error) {
      console.log('삭제 api 요청 중 오류 발생 : ', error);
      setErrorMessage('비타민 제품 삭제 중 오류 발생 다시 시도해 주세요');
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemEdit = () => {
    router.push({
      pathname: `/vitaminEdit`,
      query: {
        id: vitaminData.id,
        title: vitaminData.title,
        image: vitaminData.image,
        address: vitaminData.address,
        description: vitaminData.description
      },
    });
    console.log('vitaminDataId: ', vitaminData.id);
  };

  return (
    <section className={classes.detail}>
      <img src={vitaminData.image} alt={vitaminData.title} />
      <h1>{vitaminData.title}</h1>
      <address>{vitaminData.address}</address>
      <p>{vitaminData.description}</p>
      {errorMessage && <p>{errorMessage}</p>}
      {isLoggedIn && (
        <>
          <button onClick={handleItemEdit}>수정</button>
          <button onClick={handleItemDelete} disabled={isLoading}>
            {isLoading ? `삭제중...` : '삭제'}
          </button>
        </>
      )}
    </section>
  );
};

export default VitaminDetail;
