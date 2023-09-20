import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import firebase from '../../api/firebase';
import CommuteModal from '../CommuteModal/commuteModal';
import { useAuthState } from '../../contexts/AuthContext'; // 인증 상태 가져오기

import {
  HeaderContainer,
  HeaderLeft,
  HeaderLogo,
  HdUl,
  HeaderRight,
  HeaderRightProfile,
  ProfileName,
  ProfileImage,
  BtnSm,
  SelectedLink,
  UnselectedLink,
} from '../../styles/Home/HeaderSC';

export function Header(): JSX.Element {
  const navigate = useNavigate(); // URL 이동시키는 메소드
  const { pathname } = useLocation(); // 현재 경로
  const [uid, setUid] = useState<string | null>(null); // 유저ID
  const [username, setUsername] = useState<string>('사용자'); // 유저 이름
  const [photoURL, setPhotoURL] = useState<string>(''); // 유저 프사
  const [paths] = useState<string[][]>([
    ['Home', '/'],
    ['Wiki', '/wiki'],
    ['Gallery', '/gallery'],
  ]);
  const authState = useAuthState(); // 인증 컨텍스트에서 인증 상태 가져오기


  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        const uid = user.uid;
        const displayName = user.displayName;
        const photoURL = user.photoURL;

        setUid(uid);
        setUsername(displayName ?? '사용자');
        setPhotoURL(photoURL ?? '');
      } else {
        console.log('Signed Out'); // 로그인 안 됐을 때
      }
    });
  }, []); // 패러미터 []를 사용. 사이트 처음 렌더링 됐을 때 1회만 합니다.
  

  return (
    <HeaderContainer>
      {/* 헤더 좌측 있는 부분(로고, 다른페이지 네비게이션) */}
      <HeaderLeft>
        <HeaderLogo
          onClick={() => {
            navigate('/');
          }}
        >
          Company Space
        </HeaderLogo>
        <LinkContainer pathname={pathname} paths={paths} />
      </HeaderLeft>
      <HeaderRight>
          {/* 로그인유무에 따른 우측 부분 */}
          {authState.state === 'loaded' && authState.isAuthentication && (
            <CommuteModalContainer></CommuteModalContainer>
          )}
          <LoginContainer
            uid={uid}
            username={username}
            setUsername={setUsername}
            photoURL={photoURL}
          />
      </HeaderRight>

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
}): JSX.Element {
  return (
    <HdUl className="nav">
      {paths.map((path, idx) => {
        const currentPage = pathname.split('/')[1]; // 현재 주소의 "/"다음부분 딱 하나만 추출
        if ('/' + currentPage === path[1]) {
          // URL 배열에서 같은걸 찾기
          return (
            <SelectedLink key={idx} to={path[1]}>
              {path[0]}
            </SelectedLink>
          ); // focus된 버튼 표출
        } else {
          return (
            <UnselectedLink key={idx} to={path[1]}>
              {path[0]}
            </UnselectedLink>
          ); // unfocus된 버튼 표출
        }
      })}
    </HdUl>
  );
}

function CommuteModalContainer(): JSX.Element {
  return (
    <CommuteModal></CommuteModal>
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
}): JSX.Element {
  const navigate = useNavigate();
  return uid !== null ? ( // 로그인이 됐다면 로그인된 UI 표출
    <HeaderRightProfile
    // 프로필 선택하면 포커스, 다른데 선택하면 언포커스
    >
      <ProfileName>{username}</ProfileName>
      <ProfileImage photoURL={photoURL}></ProfileImage>
    </HeaderRightProfile>
  ) : (
    // 로그인이 안 됐다면 로그인 버튼 표출
    <BtnSm
      onClick={() => {
        navigate('/login');
      }}
    >
      로그인
    </BtnSm>
  );
}
