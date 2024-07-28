import React, { useCallback, useEffect, useState } from 'react';
import classes from './HoverDropMenuComponent.module.css';

// 드롭 다운 메뉴 구조 정의, 메뉴 항목에 대한 레이블(표시될 텍스트)과 경로(클릭시 이동경로)를 지정
const DROPDOWN_CONTENT = {
  공지사항: { label: '게시판', path: '/notice' },
  오시는길: { label: '지도', path: '/maps' },
};

function HoverDropMenuComponent({ title }) {
  // 드롭 다운 메뉴의 열림과 닫힘 상태 관리 isOpen
  const [isOpen, setIsOpen] = useState(false);
  // 터지 메뉴 여부 확인 상태 관리 isTouchMenu
  const [isTouchMenu, setIsTouchMenu] = useState(false);

  // 컴포넌트 마운트 될때 한번만 실행
  // 현재 브라우저가 터치 메뉴를 지원하는지 확인
  useEffect(() => {
    /// 윈도우 객체에 ontouchstart 이벤트가 존재하거나,
    // navigator.maxTouchPoints 가 0보다 크면 터치 메뉴 지원으로 판단
    const isTouchMenu =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchMenu(isTouchMenu);
    // 빈배열 의존성 설정 시 컴포넌트가 마운트 될때 한번만 실행
  }, []);

  // 마우스가 메뉴에 진입하거나 떠날 때 호출됨
  // 마우스가 버튼 위에 있을 때 드롭다운을 열고, 벗어나면 닫음
  // useCallback 은 복잡한로직 or 자주 변경되지 않는 함수, 자식 컴포넌트에 전달되는 함수에 주로 사용
  const handleMouseEnter = useCallback(() => {
    if (!isTouchMenu) {
      setIsOpen(true);
    }
    // 두번 째 인자 배열에 isTouchMenu 를 추가하여 isTouchMenu 가 변경될때 함수 새로 생성
  }, [isTouchMenu]);

  const handleMouseLeave = useCallback(() => {
    if (!isTouchMenu) {
      setIsOpen(false);
    }
  }, [isTouchMenu]);

  // 드롭다운 메뉴 항목 클릭 시 호출
  const handleDropdownClick = useCallback(() => {
    setIsOpen(false);
    const { label, path } = DROPDOWN_CONTENT[title] || {};
    console.log(`${label} 의 경로: ${path}`);
    window.location.href = path;
  }, [title]);

  const dropdownContent = DROPDOWN_CONTENT[title];

  return (
    <div
      className={classes.dropdown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/*접근성 향상을 위해 aria-haspopup 와 aria-expanded 속성을 사용*/}
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
            <button onClick={handleDropdownClick}>
              {dropdownContent.label}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default HoverDropMenuComponent;
