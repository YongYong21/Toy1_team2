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
      eMail: 'example@example.com',
      blog: 'www.blog.com',
      gitRepo: 'git',
      etc: {
        etcName: 'Portfolio',
        etcLink: 'www...',
      },
    },
    {
      name: '박준규',
      eMail: 'example@example.com',
      blog: 'www.blog.com',
      gitRepo: 'git',
      etc: {
        etcName: 'Portfolio',
        etcLink: 'www...',
      },
    },
    {
      name: '박현진',
      eMail: 'example@example.com',
      blog: 'www.blog.com',
      gitRepo: 'git',
      etc: {
        etcName: 'Portfolio',
        etcLink: 'www...',
      },
    },
    {
      name: '장문용',
      eMail: 'example@example.com',
      blog: 'www.blog.com',
      gitRepo: 'git',
      etc: {
        etcName: 'Portfolio',
        etcLink: 'www...',
      },
    },
    {
      name: '정범환',
      eMail: 'calmness0729@gmail.com',
      blog: 'https://bumang.tistory.com/',
      gitRepo: 'https://github.com/Bumang-Cyber?tab=repositories',
      etc: {
        etcName: 'UX Portfolio',
        etcLink: 'https://www.behance.net/',
      },
    },
  ];

  const [contributors] = useState<teamMatesProps[]>(teamMates);

  return (
    <FooterContainer>
      <InnerDiv>
        <CompanyInfo>
          <DivHeader>Company Space</DivHeader>
          <CompanyContent>
            <Logos>
              <GithubLogo />
              <SchoolLogo />
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
                  <CbtorsContents href={cbtor.eMail}>E-Mail</CbtorsContents>
                  <CbtorsContents href={cbtor.blog}>Blog</CbtorsContents>
                  <CbtorsContents href={cbtor.gitRepo}>
                    GitRepository
                  </CbtorsContents>
                  <CbtorsContents href={cbtor.etc.etcLink}>
                    {cbtor.etc.etcName}
                  </CbtorsContents>
                </CbtorDiv>
              );
            })}
          </ContributorsContainer>
        </ContributorsInfo>
      </InnerDiv>
    </FooterContainer>
  );
}
