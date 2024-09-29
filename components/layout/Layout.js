import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import { isLoggedInState } from '../../atoms/stateAtoms';
import { useRecoilState } from 'recoil';

const Layout = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('로그아웃 되었습니다.');
  };

  return (
    <div>
      <MainNavigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};

export default Layout;
