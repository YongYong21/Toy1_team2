import styled from 'styled-components';
import { theme } from '../Theme';
import { FaGithub, FaSchool } from 'react-icons/fa';

export const FooterContainer = styled.div`
  height: 280px;
  width: 100%;
  background-color: ${theme.gray100};
  padding-left: 80px;
  overflow: hidden;
  @media (max-width: 1256px) {
    height: 360px;
  }
`;

export const InnerDiv = styled.div`
  padding: 32px 40px 0 40px;
  display: flex;
  gap: 88px;
`;

export const CompanyInfo = styled.div`
  width: 320px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ContributorsInfo = styled.div`
  height: 150px;
`;

export const DivHeader = styled.div`
  font-size: ${theme.textStyles.subtitle4.fontSize};
  line-height: ${theme.textStyles.subtitle4.lineHeight};
  font-weight: 900;
  letter-spacing: -1px;
  color: ${theme.gray700};
`;

export const CompanyContent = styled.div`
  & span {
    display: block;
    font-size: ${theme.textStyles.body1.fontSize};
    line-height: ${theme.textStyles.body1.lineHeight};
    color: ${theme.gray600};
  }
`;

export const Logos = styled.a`
  margin-top: 24px;
`;

export const GithubLogo = styled(FaGithub)`
  color: ${theme.gray700};
  font-size: 23px;
  margin-bottom: 12px;
  margin-right: 12px;
`;

export const SchoolLogo = styled(FaSchool)`
  color: ${theme.gray700};
  font-size: 26px;
  margin-bottom: 12px;
  transform: translateY(1px);
`;

export const ContributorsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 24px 56px;
`;

export const CbtorDiv = styled.div`
  margin-top: 24px;
`;

export const CbtorsHeader = styled.div`
  font-size: ${theme.textStyles.body1.fontSize};
  font-weight: 500;
  margin-bottom: 8px;
`;
export const CbtorsContents = styled.a`
  display: block;
  font-size: 13px;
  margin-bottom: 4px;
  color: ${theme.gray600};
  &:hover {
    text-decoration: underline;
  }
`;
