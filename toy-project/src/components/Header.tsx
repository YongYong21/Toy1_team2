import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import firebase from "../api/firebase";

import { HeaderContainer, HeaderLeft, HeaderLogo, HdUl, StyledLink, HeaderRight, ProfileName, ProfileImage, StyledNavLink, AngleDown, AngleUp, BtnSm } from "./HeaderSC";

export function Header() {
  let navigate = useNavigate();
  let { pathname } = useLocation();
  let [username, setUsername] = useState<string>("사용자");
  let [photoURL, setPhotoURL] = useState<string>("");
  let [paths] = useState<string[][]>([
    ["Home", "/"],
    ["Wiki", "/wiki"],
    ["Gallery", "/gallery"],
  ]);

  useEffect(() => {
    const auth = firebase.auth();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid;
        const displayName = user.displayName;
        const photoURL = user.photoURL;
        setUsername(displayName || "사용자");
        setPhotoURL(photoURL || "");
      } else {
        console.log("Signed Out");
      }
    });
  }, []);

  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderLogo onClick={() => navigate("/")}>Company Space</HeaderLogo>
        <LinkContainer pathname={pathname} paths={paths} />
      </HeaderLeft>
      <LoginContainer username={username} setUsername={setUsername} photoURL={photoURL} />
      {/* 팝업으로 처리할 부분 */}
    </HeaderContainer>
  );
}

function LinkContainer({ pathname, paths }: { pathname: string; paths: string[][] }) {
  return (
    <HdUl className="nav">
      {paths.map((path) => {
        let curPage = pathname.split("/")[1];
        if (curPage === path[1].slice(1)) {
          return <StyledNavLink to={path[1]}>{path[0]}</StyledNavLink>;
        } else {
          return <StyledLink to={path[1]}>{path[0]}</StyledLink>;
        }
      })}
    </HdUl>
  );
}

function LoginContainer({ username, photoURL }: { username: string; setUsername: object; photoURL: string }) {
  let navigate = useNavigate();
  let [focused, setFocused] = useState(false);
  return false ? ( //파이어베이스 인증 네임 불러와서 조건 비교할 예정
    <HeaderRight
      onFocus={() => {
        setFocused(true);
      }}
      onBlur={() => {
        setFocused(false);
      }}
    >
      <ProfileName>{username}</ProfileName>
      <ProfileImage photoURL={photoURL || ""}></ProfileImage>
      {focused ? <AngleUp></AngleUp> : <AngleDown></AngleDown>}
    </HeaderRight>
  ) : (
    <BtnSm
      onClick={() => {
        navigate("/login");
      }}
    >
      로그인
    </BtnSm>
  );
}
