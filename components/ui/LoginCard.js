import classes from './LoginCard.module.css';

const LoginCard = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default LoginCard;
