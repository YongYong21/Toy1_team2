import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CommuteModal from '../Commute/CommuteModal';

import firebase, { auth } from '../../api/firebase';
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
  HdMenu,
  HdMenuLi,
  HdMenuUl,
  HeaderRightLoggedout,
  // LogoutDiv,
} from '../../styles/Home/HeaderSC';

export function Header(): JSX.Element {
  const navigate = useNavigate(); // URL 이동시키는 메소드
  const { pathname } = useLocation(); // 현재 경로
  const [username, setUsername] = useState<string>('사용자'); // 유저 이름
  // const [photoURL, setPhotoURL] = useState<string>(''); // 유저 프사
  const [prfSelected, setPrfSelected] = useState<boolean>(false);

  const [paths] = useState<string[][]>([
    ['Home', '/'],
    ['Wiki', '/wiki/rules'],
    ['Gallery', '/gallery/facility'],
  ]);
  const authState = useAuthState(); // 인증 컨텍스트에서 인증 상태 가져오기

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        const displayName = user.displayName;
        setUsername(displayName ?? '사용자');
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
          username={username}
          setUsername={setUsername}
          prfSelected={prfSelected}
          setPrfSelected={setPrfSelected}
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
        const currentPage = pathname.split('/')[1]; // 현재 주소의 가운데만 추출
        const targetPath = path[1].split('/')[1]; // path의 가운데만 추출

        if (currentPage === targetPath) {
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
  return <CommuteModal></CommuteModal>;
}

function LoginContainer({
  username, //
  prfSelected,
  setPrfSelected,
}: {
  username: string;
  setUsername: object;
  prfSelected: boolean;
  setPrfSelected: React.Dispatch<boolean>;
}): JSX.Element {
  const navigate = useNavigate();
  const authState = useAuthState();
  useEffect(() => {}, [authState]);

  const onClickMenu = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    console.log('onClickPrf');
    setPrfSelected(true);
  };

  const onClickLogoutBtn = (): void => {
    console.log('onClickLogoutBtn');
    const res = confirm('정말 로그아웃을 하시겠어요?');
    if (res) {
      auth
        .signOut()
        .then(() => {
          // 로그아웃 성공
          alert('로그아웃되었습니다.');
          // 모든 로컬 스토리지 데이터를 지우기
          localStorage.clear();
        })
        .catch((error) => {
          console.error('로그아웃 중 에러가 발생했습니다:', error);
        });
      setPrfSelected(false);
    }
  };

  const onBlurMenu = (): void => {
    setTimeout(() => {
      setPrfSelected(false);
      console.log('onBlurPrfBtn');
    }, 300);
  };

  // 로그인이 됐다면 로그인된 UI 표출
  if (authState.state === 'loaded' && authState.isAuthentication) {
    return (
      <div style={{ position: 'relative' }}>
        <HeaderRightProfile onClick={onClickMenu} onBlur={onBlurMenu}>
          <ProfileName>{username}</ProfileName>
          <ProfileImage></ProfileImage>
        </HeaderRightProfile>
        {prfSelected && (
          <HdMenu>
            <HdMenuUl className="menu-ul">
              <HdMenuLi onClick={onClickLogoutBtn}>로그아웃</HdMenuLi>
            </HdMenuUl>
          </HdMenu>
        )}
      </div>
    );
  }
  // 로그인이 안 됐다면 로그인 버튼 표출
  else {
    return (
      <HeaderRightLoggedout>
        <UnselectedLink to={'/register'}>회원가입</UnselectedLink>
        <BtnSm
          onClick={() => {
            navigate('/login');
          }}
        >
          로그인
        </BtnSm>
      </HeaderRightLoggedout>
    );
  }
}
