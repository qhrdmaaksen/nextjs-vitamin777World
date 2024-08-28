import { useRouter } from 'next/router';

const EditVitamin = () => {
  const router = useRouter();
  const { id, title, address, image, description } = router.query;

  const handleEditSubmit = () => {

  }

  return (
    <div>
      <h1>제품 상세 수정 페이지</h1>
      <form onSubmit={handleEditSubmit}>
        <input type="text" defaultValue={image} placeholder="" />
        <input type="text" defaultValue={title} placeholder="" />
        <input type="text" defaultValue={address} placeholder="" />
        <input type="text" defaultValue={description} placeholder="" />
        <textarea defaultValue={description} />
        <button>수정 제출</button>
      </form>
    </div>
  );
};

export default EditVitamin;
