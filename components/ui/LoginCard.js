import classes from './LoginCard.module.css';

function LoginCard(props) {
  return <div className={classes.card}>{props.children}</div>;
}

export default LoginCard;
