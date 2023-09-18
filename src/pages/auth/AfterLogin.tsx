import React from 'react';
import { useAuthState } from '../../contexts/AuthContext';

const AfterLogin = () => {
  // useAuthState()를 사용하여 현재 사용자 정보 가져오기
  const authState = useAuthState();

  return (
    <div>
      {authState.state === 'loaded' && authState.isAuthentication ? (
        <p>반갑습니다, {authState.user!.displayName}님!</p>
      ) : (
        <p>로그인 상태가 아닙니다.</p>
      )}
    </div>
  );
};

export default AfterLogin;
