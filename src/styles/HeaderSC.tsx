import styled, { css, keyframes } from "styled-components";
import { theme } from "./Theme";
import { Link, NavLink } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export let HeaderContainer = styled.div`
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${theme.gray200};
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  padding: 0 24px;
  z-index: 100;
  background-color: ${theme.white};
`;

export let HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

export let HeaderLogo = styled.div`
  font-size: ${theme.textStyles.subtitle4.fontSize};
  line-height: ${theme.textStyles.subtitle4.lineHeight};
  font-weight: 900;
  letter-spacing: -1px;
  color: ${theme.blue700};
  cursor: pointer;
`;

export let HdUl = styled.ul`
  display: flex;
  gap: 32px;
  margin-left: 80px;
`;

// export let Selected = css`
//   font-weight: 700;
//   color: ${theme.gray900};
// `;
export let Selected = css`
  font-weight: 700;
  color: ${theme.gray900};
`;

export let UnselectedLink = styled(Link)`
  display: block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: ${theme.textStyles.body1};
  font-weight: 500;
  color: ${theme.gray700};
  transition: all 0.3s;

  &:hover {
    background-color: ${theme.blue200};
    color: ${theme.gray900};
  }
`;

export let SelectedLink = styled(NavLink)`
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

export let HeaderRight = styled.button`
  display: flex;
  border: 1px solid ${theme.blue300};
  background-color: ${theme.blue100};
  align-items: center;
  padding: 4px 8px 4px 16px;
  border-radius: 8px;
  transition: all 0.2s;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: ${theme.blue300};
    box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.05);
  }
  &:focus {
    background-color: ${theme.blue300};
  }
`;

export let ProfileName = styled.span`
  font-family: "Pretendard", sans-serif;
  font-size: ${theme.textStyles.body1.fontSize};
  margin-right: 8px;
`;

interface myProps {
  photoURL: string;
}

export let ProfileImage = styled.div<myProps>`
  width: 32px;
  height: 32px;
  background-color: #777;
  border-radius: 50%;
  background-image: url(${(props) => props.photoURL});
  background-size: cover;
`;

export let AngleDown = styled(FaAngleDown)`
  color: ${theme.gray700};
  margin: 0 4px 0 4px;
`;

export let AngleUp = styled(FaAngleUp)`
  color: ${theme.gray700};
  margin: 0 4px 0 4px;
`;

export let BtnSm = styled.button`
  font-size: ${theme.textStyles.button.fontSize};
  padding: 6px 16px;
  background-color: ${theme.blue700};
  border-radius: 8px;
  color: ${theme.white};
  &:hover {
    background-color: ${theme.blue800};
  }
`;