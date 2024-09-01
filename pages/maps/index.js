import VitaminKakaoMaps from '../../components/vitamins/VitaminKakaoMaps';
import Card from '../../components/ui/Card';
import classes from './maps.module.css';

const KakaoMapsPage = () => {
  return (
    <Card>
      <div className={classes.container}>
        <h1>비타민 월드 오시는 길</h1>
        <hr></hr>
        <h3>서울특별시 중구 세종대로 110</h3>
        <VitaminKakaoMaps width="100%" height="400px" />
      </div>
    </Card>
  );
};

export default KakaoMapsPage;
