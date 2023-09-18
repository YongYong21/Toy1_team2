import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import firebase from "../api/firebase";

import { HeaderContainer, HeaderLeft, HeaderLogo, HdUl, HeaderRight, ProfileName, ProfileImage, BtnSm, SelectedLink, UnselectedLink } from "../styles/HeaderSC";

export function Header() {
  let navigate = useNavigate(); // URL 이동시키는 메소드
  let { pathname } = useLocation(); // 현재 경로
  let [uid, setUid] = useState<string | null>(null); // 유저ID
  let [username, setUsername] = useState<string>("사용자"); // 유저 이름
  let [photoURL, setPhotoURL] = useState<string>(""); // 유저 프사
  let [paths] = useState<string[][]>([
    //[페이지이름, URL]
    ["Home", "/"],
    ["Wiki", "/wiki/rule"],
    ["Gallery", "/gallery"],
  ]);

  useEffect(() => {
    //파이어베이스 로그인 정보 불러오기 로직
    const auth = firebase.auth();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid || null;
        const displayName = user.displayName || "사용자";
        const photoURL = user.photoURL || "";

        setUid(uid);
        setUsername(displayName);
        setPhotoURL(photoURL);
      } else {
        //로그인 안 됐을 때
        console.log("Signed Out");
      }
    });
  }, []); //패러미터 []를 사용. 사이트 처음 렌더링 됐을 때 1회만 합니다.

  return (
    <HeaderContainer>
      {/* 헤더 좌측 있는 부분(로고, 다른페이지 네비게이션) */}
      <HeaderLeft>
        <HeaderLogo onClick={() => navigate("/")}>Company Space</HeaderLogo>
        <LinkContainer pathname={pathname} paths={paths} />
      </HeaderLeft>
      {/* 로그인유무에 따른 우측 부분 */}
      <LoginContainer uid={uid} username={username} setUsername={setUsername} photoURL={photoURL} />
    </HeaderContainer>
  );
}

// 링크 버튼들
function LinkContainer({
  pathname, // 현재 경로
  paths, // 페이지 URL 배열
}: {
  pathname: string;
  paths: string[][];
}) {
  return (
    <HdUl className="nav">
      {paths.map((path) => {
        let currentPage = pathname.split("/")[1]; //현재 주소의 "/"다음부분 딱 하나만 추출
        if (currentPage === path[1]) {
          //URL 배열에서 같은걸 찾으면
          return <SelectedLink to={path[1]}>{path[0]}</SelectedLink>; //focus된 버튼 표출
        } else {
          return <UnselectedLink to={path[1]}>{path[0]}</UnselectedLink>; //unfocus된 버튼 표출
        }
      })}
    </HdUl>
  );
}

function LoginContainer({
  username, //
  photoURL,
  uid,
}: {
  username: string;
  setUsername: object;
  photoURL: string;
  uid: string | null;
}) {
  let navigate = useNavigate();
  let [focused, setFocused] = useState(false);
  return uid ? ( // 로그인이 됐다면 로그인된 UI 표출
    <HeaderRight
      //프로필 선택하면 포커스, 다른데 선택하면 언포커스
      onFocus={() => {
        setFocused(true);
      }}
      onBlur={() => {
        setFocused(false);
      }}
    >
      <ProfileName>{username}</ProfileName>
      <ProfileImage photoURL={photoURL || ""}></ProfileImage>
    </HeaderRight>
  ) : (
    //로그인이 안 됐다면 로그인 버튼 표출
    <BtnSm
      onClick={() => {
        navigate("/login");
      }}
    >
      로그인
    </BtnSm>
  );
}
