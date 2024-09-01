import classes from './MainNavigation.module.css';
import Link from 'next/link';
import HoverDropMenuComponent from '../vitamins/HoverDropMenuComponent';
import RightSideBanner from "../banner/RightSideBanner";
import LeftSideBanner from "../banner/LeftSideBanner";

const MainNavigation = () => {
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
          </ul>
        </nav>
      </header>
      <RightSideBanner interval={4000} />
      <LeftSideBanner interval={4000} />
    </>
  );
};

export default MainNavigation;
