import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { formDataState } from '../../atoms/stateAtoms';
import { useEffect } from 'react';
import Card from '../../components/ui/Card';
import classes from './VitaminEdit.module.css';

const VitaminEdit = () => {
  const router = useRouter();
  const { id, title, address, image, description } = router.query;
  const [formData, setFormData] = useRecoilState(formDataState);

  useEffect(() => {
    setFormData({
      title,
      address,
      image,
      description,
    });
  }, [title, address, image, description]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      // 수정 요청 보내기
      const response = await fetch(
        `http://localhost:3000/api/updateVitamin?id=${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '제품 수정 api 요청 실패');
      }
      console.log('비타민 아이템 수정 완료');
      // 수정 후 해당 아이템 상세 페이지 이동
      await router.push(`http://localhost:3000?id=${id}`);
    } catch (error) {
      console.error('제품 수정 api 요청 중 오류 발생: ', error.message);
    }
  };

  return (
    <Card>
      <div className={classes.container}>
        <h1>제품 상세 수정 페이지</h1>
        <form onSubmit={handleEditSubmit}>
          <div>
            <label htmlFor="image">이미지 링크 입력 </label>
            <input
              name="image"
              type="text"
              defaultValue={image}
              placeholder="이미지 링크 입력"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="title">제목 입력 </label>
            <input
              name="title"
              type="text"
              defaultValue={title}
              placeholder="제목 입력"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">주소 링크 입력 </label>
            <input
              name="address"
              type="text"
              defaultValue={address}
              placeholder="주소 링크 입력"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description">상세 설명 입력 </label>
            <textarea
              name="description"
              defaultValue={description}
              placeholder="제품 상세 설명 입력"
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.buttonContainer}>
            <button>수정 제출</button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default VitaminEdit;
