import AdminInputForm from '../../components/vitamins/AdminInputForm';
import classes from './adminLoginPage.module.css'

const adminLoginPage = () => {
  return (
    <div className={classes.adminLoginContainer}>
      <AdminInputForm />
    </div>
  );
};

export default adminLoginPage;
