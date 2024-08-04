/*왜?: Recoil 상태 관리 라이브러리에서 상태를 사용하기 위해 useRecoilState 훅을 가져옵니다.
이유: 상태를 읽고 업데이트할 수 있는 기능을 제공하여, 컴포넌트 간에 상태를 쉽게 공유하고 관리할 수 있도록 함*/
import { useRecoilState } from 'recoil';
/*왜?: 상태를 정의한 아톰을 가져옵니다.
이유: searchTermState는 검색어를 저장하는 상태로, 이 상태를 통해 현재 검색어를 관리*/
import { searchTermState } from '../../atoms/stateAtoms';
/*왜?: Next.js의 라우팅 기능을 사용하기 위해 useRouter 훅을 가져옵니다.
이유: 페이지 간의 네비게이션을 관리하기 위해 현재 라우터 객체에 접근할 수 있게 함*/
import { useRouter } from 'next/router';
import classes from './VitaminSearchBox.module.css';

/*왜?: 비타민 검색 박스 컴포넌트를 정의합니다.
이유: 사용자로부터 검색어를 입력받고, 이를 처리하여 검색 결과 페이지로 이동하기 위해 컴포넌트를 생성*/
export const VitaminSearchBox = () => {
  /*왜?: 현재 라우터 객체를 가져옵니다.
이유: 페이지 전환 및 URL 조작을 위해 router 객체를 사용*/
  const router = useRouter();
  /*왜?: Recoil 상태에서 검색어를 가져오고 업데이트하기 위한 상태 변수를 정의합니다.
이유: searchTerm은 현재 검색어를 저장하고, setSearchTerm은 검색어를 업데이트하는 함수*/
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);

  /*폼 제출 이벤트를 처리하기 위한 비동기 함수입니다.
이유: 사용자가 검색어를 제출했을 때 발생하는 이벤트를 처리하여, 검색 결과 페이지로 이동할 수 있도록 합*/
  const handleInputSearchSubmit = async (e) => {
    /*왜?: 폼의 기본 제출 동작을 방지합니다.
이유: 페이지가 새로 고쳐지는 것을 방지하여, JavaScript를 통해 검색 결과 페이지로 리다이렉트할 수 있도록 함*/
    e.preventDefault();

    /*왜?: 검색어가 비어있지 않은지 확인합니다.
이유: 빈 검색어로는 검색을 수행할 수 없으므로, 실제로 입력된 검색어가 있는지 확인*/
    if (searchTerm.trim()) {
      /*왜?: 검색어를 URL에 포함하여 검색 결과 페이지로 이동합니다.
      이유: encodeURIComponent 를 사용하여 검색어를 안전하게 인코딩하고,
      router.push를 통해 해당 URL로 이동하여 사용자가 검색 결과를 볼 수 있도록 함*/
      await router.push(`/search/${encodeURIComponent(searchTerm)}`);
    }
    // 입력 필드 초기화
    setSearchTerm('');
  };

  return (
    <>
      <form onSubmit={handleInputSearchSubmit}>
        {/*왜?: 사용자로부터 검색어를 입력받기 위한 텍스트 입력 필드를 생성합니다.
        이유: onChange 이벤트를 통해 사용자 입력을 실시간으로 searchTerm 상태에 업데이트하고,
        value 속성을 통해 상태와 입력 필드를 동기화함*/}
        <div className={classes.searchInputDiv}>
            <p>제품 검색</p>
            <input
              className={classes.searchInputLarge}
              type="text"
              placeholder="제품을 입력해주세요."
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
        </div>
      </form>
    </>
  );
};
export default VitaminSearchBox;
