import styled from 'styled-components';
import { theme } from '../Theme';
import { Link, NavLink } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

export const HeaderContainer = styled.div`
  font-family:
    'Pretendard',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 56px;

  position: fixed;
  top: 0;
  z-index: 100;

  padding: 0 24px;

  background-color: ${theme.white};

  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid ${theme.gray200};
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderLogo = styled.div`
  font-size: ${theme.textStyles.subtitle4.fontSize};
  font-weight: 900;
  line-height: ${theme.textStyles.subtitle4.lineHeight};
  letter-spacing: -1px;

  color: ${theme.blue700};

  cursor: pointer;
`;

export const HdUl = styled.ul`
  display: flex;
  gap: 32px;

  margin-left: 80px;
`;

export const UnselectedLink = styled(Link)`
  display: block;
  border-radius: 4px;

  font-size: ${theme.textStyles.body1};
  font-weight: 500;
  color: ${theme.gray700};

  transition: all 0.3s;

  padding: 4px 8px;

  &:hover {
    background-color: ${theme.blue200};
    color: ${theme.gray900};
  }
`;

export const SelectedLink = styled(NavLink)`
  display: block;
  padding: 4px 8px;
  border-radius: 4px;

  font-weight: 700;
  font-size: ${theme.textStyles.body1};
  color: ${theme.gray900};

  &:hover {
    background-color: ${theme.blue200};
  }

  &:focus {
    font-weight: 700;
    color: ${theme.gray900};
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderRightProfile = styled.button`
  display: flex;
  align-items: center;

  font-weight: 500;

  border: 1px solid ${theme.blue300};
  border-radius: 8px;
  background-color: ${theme.blue100};

  padding: 4px 8px 4px 16px;

  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${theme.blue300};
    box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.05);
  }

  &:focus {
    background-color: ${theme.blue300};
  }
`;

export const ProfileName = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-size: ${theme.textStyles.body1.fontSize};

  margin-right: 8px;
`;

export const ProfileImage = styled.div`
  width: 32px;
  height: 32px;

  background-color: ${theme.gray300};
  background-image: url('https://firebasestorage.googleapis.com/v0/b/wiki-app-46908.appspot.com/o/rocket3xDarker.png?alt=media&token=e9c4fac1-f4dc-4250-abd8-50ab28ef0809');
  background-size: cover;

  border-radius: 50%;
`;

export const AngleDown = styled(FaAngleDown)`
  color: ${theme.gray700};
  margin: 0 4px 0 4px;
`;

export const AngleUp = styled(FaAngleUp)`
  color: ${theme.gray700};
  margin: 0 4px 0 4px;
`;

export const BtnSm = styled.button`
  font-size: ${theme.textStyles.button.fontSize};
  color: ${theme.white};

  padding: 6px 16px;
  background-color: ${theme.blue700};
  border-radius: 8px;

  &:hover {
    background-color: ${theme.blue800};
  }
`;

export const LogoutDiv = styled.div`
  position: absolute;
  top: 60px;
  right: 28px;
  z-index: 100;

  width: 100px;
  height: 24px;

  background-color: white;
`;

export const HdMenu = styled.div`
  position: absolute;
  bottom: -56px;

  width: 100%;

  border: 2px solid ${theme.gray500};
  border-radius: 8px;

  background-color: ${theme.white};

  box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  padding: 4px;
`;

export const HdMenuUl = styled.ul``;
export const HdMenuLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 40px;
  border-radius: 8px;
  white-space: no-wrap;
  background-color: ${theme.white};

  color: ${theme.gray700};

  cursor: pointer;

  &:hover {
    background-color: ${theme.blue100};
    color: ${theme.gray900};
  }
`;

export const HeaderRightLoggedout = styled.div`
  display: flex;
  gap: 12px;
`;
