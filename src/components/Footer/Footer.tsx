import { useState } from 'react';
import {
  CbtorDiv,
  CompanyContent,
  CompanyInfo,
  ContributorsContainer,
  CbtorsContents,
  CbtorsHeader,
  ContributorsInfo,
  DivHeader,
  FooterContainer,
  GithubLogo,
  InnerDiv,
  SchoolLogo,
  Logos,
} from '../../styles/Footer/FooterSC';

interface teamMatesProps {
  name: string;
  eMail: string;
  gitRepo: string;
  blog: string;
  etc: {
    etcName: string;
    etcLink: string;
  };
}

export function Footer(): JSX.Element {
  const teamMates: teamMatesProps[] = [
    {
      name: '박용희',
      eMail: 'imkinggosu@gmail.com',
      blog: 'https://velog.io/@yongyong_21',
      gitRepo: 'https://github.com/YongYong21',
      etc: {
        etcName: '',
        etcLink: '',
      },
    },
    {
      name: '박준규',
      eMail: 'junkue17@naver.com',
      blog: 'https://velog.io/@junkue20',
      gitRepo: 'https://github.com/junkue20',
      etc: {
        etcName: '',
        etcLink: '',
      },
    },
    {
      name: '신현진',
      eMail: 'tlsguswls319@naver.com',
      blog: 'https://velog.io/@xxxjinn913',
      gitRepo: 'https://github.com/xxxjinn',
      etc: {
        etcName: '',
        etcLink: '',
      },
    },
    {
      name: '장문용',
      eMail: 'dltk456@naver.com',
      blog: 'https://velog.io/@moonyah',
      gitRepo: 'https://github.com/moonyah',
      etc: {
        etcName: '',
        etcLink: '',
      },
    },
    {
      name: '정범환',
      eMail: 'calmness0729@gmail.com',
      blog: 'https://bumang.tistory.com/',
      gitRepo: 'https://github.com/Bumang-Cyber?tab=repositories',
      etc: {
        etcName: 'UX Portfolio',
        etcLink: 'https://www.behance.net/calmness078ad4',
      },
    },
  ];

  const [contributors] = useState<teamMatesProps[]>(teamMates);
  const [goTo, setGoTo] = useState<string>('');

  const onClickGitHub = (): void => {
    setGoTo('https://github.com/YongYong21/Toy1_team2');
  };

  const onClickSchoolLogo = (): void => {
    setGoTo('https://fastcampus.co.kr/');
  };

  return (
    <FooterContainer>
      <InnerDiv>
        <CompanyInfo>
          <DivHeader>Company Space</DivHeader>
          <CompanyContent>
            <Logos href={goTo} target="_blank">
              <GithubLogo onClick={onClickGitHub} />
              <SchoolLogo onClick={onClickSchoolLogo} />
            </Logos>
            <span>A Total Solution for Managing Company.</span>
            <span>
              @ {`${new Date().getFullYear()}`} DaeBakJingJo. All Right Reserved
            </span>
          </CompanyContent>
        </CompanyInfo>
        <ContributorsInfo>
          <DivHeader>Contributors</DivHeader>
          <ContributorsContainer>
            {contributors.map((cbtor, i) => {
              return (
                <CbtorDiv key={i}>
                  <CbtorsHeader>{cbtor.name}</CbtorsHeader>
                  {cbtor.eMail !== '' && (
                    <CbtorsContents //
                      href={cbtor.eMail}
                      target="_blank"
                    >
                      E-Mail
                    </CbtorsContents>
                  )}
                  {cbtor.blog !== '' && (
                    <CbtorsContents //
                      href={cbtor.blog}
                      target="_blank"
                    >
                      Blog
                    </CbtorsContents>
                  )}
                  {cbtor.gitRepo !== '' && (
                    <CbtorsContents //
                      href={cbtor.gitRepo}
                      target="_blank"
                    >
                      GitRepository
                    </CbtorsContents>
                  )}
                  {cbtor.etc.etcName !== '' && (
                    <CbtorsContents //
                      href={cbtor.etc.etcLink}
                      target="_blank"
                    >
                      {cbtor.etc.etcName}
                    </CbtorsContents>
                  )}
                </CbtorDiv>
              );
            })}
          </ContributorsContainer>
        </ContributorsInfo>
      </InnerDiv>
    </FooterContainer>
  );
}
