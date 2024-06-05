import classes from './MainNavigation.module.css';
import Link from "next/link";

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
          <img src="/util/basicLogo02.png" />
      </div>
      <nav>
        <ul>
          <li>
            <Link href='/'>
                <p className={classes.title}>vitamin777World</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
