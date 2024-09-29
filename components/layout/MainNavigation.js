import classes from './MainNavigation.module.css';
import Link from 'next/link';
import HoverDropMenuComponent from '../vitamins/HoverDropMenuComponent';
import RightSideBanner from '../banner/RightSideBanner';
import LeftSideBanner from '../banner/LeftSideBanner';
import VitaminSearchBox from '../vitamins/VitaminSearchBox';

const MainNavigation = (props) => {
  const { setVitamins } = props;
  return (
    <>
      <header className={classes.header}>
        <div className={classes.logo}>
          <img src="/utils/basicLogo02.png" alt="비타민 월드 기본 로고" />
        </div>
        <nav>
          <ul>
            <li>
              <HoverDropMenuComponent title="공지사항" />
            </li>
            <li>
              <HoverDropMenuComponent title="오시는길" />
            </li>
            <li>
              <Link href="/">
                <p className={classes.title}>vitamin777World</p>
              </Link>
            </li>
            <li>
              <Link href="/adminLoginPage">
                <p className={classes.adminLogin}>관리자 페이지</p>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={classes.bannerContainer}>
        <LeftSideBanner interval={4000} />
        <div className={classes.searchClass}>
          <VitaminSearchBox setVitamins={setVitamins} />
        </div>
        <RightSideBanner interval={4000} />
      </div>
    </>
  );
};
export default MainNavigation;
