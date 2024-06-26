import {useRef, useState} from "react";
import classes from './AdminInputForm.module.css';
import LoginCard from "../ui/LoginCard";
import Link from "next/link";

function AdminInputForm() {
    const idInputRef = useRef();
    const passwordInputRef = useRef();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function loginSubmitHandler(event) {
        event.preventDefault();

        const enteredId = idInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        // 하드코딩된 admin info
        const adminId = 'admin';
        const adminPassword = 'adminPassword';

        // 입력된 정보와 admin 정보가 일치하는지 체크
        if (enteredId === adminId && enteredPassword === adminPassword) {
            // 로그인 성공 시 알림창 팝업
            alert('관리자 로그인 성공');
            // 성공 시 수행할 작업
            setIsLoggedIn(true);
        } else {
            // 로그인 실패 시 알림창 팝업
            alert('관리자 정보가 일치하지 않습니다');
        }
    }

    return (
        <LoginCard>
            {/* 로그인 상태에 따라 폼 또는 메시지를 조건부 렌더링 */}
            {!isLoggedIn ? (
                <form className={classes.form} onSubmit={loginSubmitHandler}>
                    <div className={classes.control}>
                        <label htmlFor='id'>관리자 로그인</label>
                        <input type='text' required id='id' ref={idInputRef}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='password'>Password</label>
                        <input type='password' required id='password' ref={passwordInputRef}/>
                    </div>
                    <div className={classes.actions}>
                        <button>login</button>
                    </div>
                </form>
            ) : (
                <div>
                    <p className={classes.loggedInMessage}>관리자 접속중</p>
                    {/* 관리자 로그인 성공 시 'Add New Vitamin' 링크 보여주기 */}
                    <div>
                        <Link href='/new-vitamin'>
                            <p className={classes.addNewVitamin}>Add New Vitamin</p>
                        </Link>
                    </div>
                </div>
            )}
        </LoginCard>
    )
}

export default AdminInputForm;