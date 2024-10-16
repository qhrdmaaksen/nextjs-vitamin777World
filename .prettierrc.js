module.exports =  {
    //한 줄이 이 글자수를 넘게 되면 들여쓰기되어 코드가 세로로 정리된다. (default: 80)
    "printWidth": 80,
    //탭 너비 (default: 2)
    "tabWidth": 2,
    //탭 사용 여부. 참이면 탭이있는 줄을 들여 쓰기 한다. (default: false)
    "useTabs": false,
    //세미클론 강제 여부 (default: true)
    "semi": true,
    //홑따옴표를 쓸건지 설정. 기본값은 쌍따옴표. 코딩을 하면서 홑따옴표를 썼다면 강제로 쌍따옴표로 변경. (default: false)
    "singleQuote": true,
    /*객체, 배열, 함수 등의 후행에 쉼표를 찍을지 제어
    "none" - 쉼표를 붙히지 않음
    "es5" - ES5에서 유효한 후행 쉼표 붙힘 (객체, 배열 등)
    "all" - 가능하면 후행 쉼표를 붙힘 (함수 인수)*/
    "trailingComma": "all",
    //객체 리터럴 사용시 괄호에 공백 삽입 여부 (default: true)
    "bracketSpacing": true,
    // JSX 의 마지막 `>`를 다음 줄로 내릴지 여부
    "jsxBracketSameLine": false,
    //단독 화살표 함수의 매개 변수 주위에 괄호를 자동으로 붙힘 (default: 'avoid')
    "arrowParens": "always",
    //vue 파일의 script와 style태그 들여쓰기 여부
    "vueIndentScriptAndStyle": false,
    //맨마지막 줄 넣는지 여부
    "endOfLine": "auto",

    // .gitignore 처럼 prettier 이 적용되지 않게 하려면 .prettier ignore 에 파일명을 기록하면 그 파일은 무시
    // 또한 파일 뿐만 아니고 코드내에서 주석으로 // prettier-ignore 라고 작성하면 해당 코드만 무시
    //ignorePath
    // 이 확장 기능을 비활성화 할 언어 ID 목록
    //disableLanguages: ["vue"]
};