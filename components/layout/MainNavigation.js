import classes from './MainNavigation.module.css';
import Link from 'next/link';
import HoverEtcButton from '../vitamins/HoverDropMenuComponent';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src="/util/basicLogo02.png" alt="비타민 월드 기본 로고"/>
      </div>
      <nav>
        <ul>
          <li>
            <HoverEtcButton title="공지사항" />
            <HoverEtcButton title="오시는길" />
          </li>
          <li>
            <Link href="/">
              <p className={classes.title}>vitamin777World</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
