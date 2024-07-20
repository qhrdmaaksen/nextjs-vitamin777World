import React, {useEffect, useState} from 'react';
import classes from './HoverDropMenuComponent.module.css';

const DROPDOWN_CONTENT = {
  게시판: '공지 사항',
  오시는길: '지도',
};

function HoverDropMenuComponent({ title }) {
  // 드롭 다운 메뉴의 열림과 닫힘 상태 관리 isOpen
  const [isOpen, setIsOpen] = useState(false);
  // 터지 메뉴 여부 확인 상태 관리 isTouchMenu
  const [isTouchMenu, setIsTouchMenu] = useState(false);


  // 컴포넌트 마운트 될때 한번만 실행
  // 현재 브라우저가 터치 메뉴를 지원하는지 확인
  useEffect(() => {
    setIsTouchMenu('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // 터치 메뉴가 아닐 경우에만 호버 기능을 활성화
  // 마우스가 버튼 위에 있을 때 드롭다운을 열고, 벗어나면 닫음
  const handleMouseEnter = () => !isTouchMenu && setIsOpen(true);
  const handleMouseLeave = () => !isTouchMenu && setIsOpen(false);

  const dropdownContent = DROPDOWN_CONTENT[title];

  const handleMapsClick = () => {
    setIsOpen(false);
    if(dropdownContent === '지도') {
      window.location.href = '/maps'
    }
  }

  return (
    <div
      className={classes.dropdown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/*접근성을 위해 aria-haspopup 와 aria-expanded 속성을 사용*/}
      <button
        className={classes.dropdownToggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {title}
      </button>
      {/*조건부 렌더링을 사용하여 isOpen 이 true 이고 dropdownContent 가 존재할 때만 드롭다운 메뉴를 표시*/}
      {isOpen && dropdownContent && (
        <ul className={classes.dropdownMenu} role="menu">
          <li>
            <button onClick={handleMapsClick}>{dropdownContent}</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default HoverDropMenuComponent;
