import { useState } from 'react';
import { ShortcutContainer, Height30 } from '../styles/ShortcutSC';
import {
  TabBtn,
  TabBtnClk,
  TabList,
  Title,
  TitleLine,
  Th,
  Col,
  Tb,
  Tr,
  Cell,
  DocText,
  FloatBtn,
} from '../styles/TodoListSC';

export function Shortcut(): JSX.Element {
  // const [addFocus, setAddFocus] = useState(false);
  const [clkTab, setClkTab] = useState([1, 0]);

  const wikiPosts = [
    {
      title: '회사 내규',
      editor: '박현진',
      recentEdit: '2023.09.13.',
    },
    {
      title: '팀 소개',
      editor: '박준규',
      recentEdit: '2023.09.13.',
    },
    {
      title: '조직도',
      editor: '박용희',
      recentEdit: '2023.09.13.',
    },
    {
      title: '진행중인 프로젝트',
      editor: '장문용',
      recentEdit: '2023.09.13.',
    },
    {
      title: '예정된 프로젝트',
      editor: '정범환',
      recentEdit: '2023.09.13.',
    },
    {
      title: '완료된 프로젝트',
      editor: '박현진',
      recentEdit: '2023.09.13.',
    },
    {
      title: '신입사원 필독서',
      editor: '박준규',
      recentEdit: '2023.09.13.',
    },
    {
      title: '온보딩 주제',
      editor: '박용희',
      recentEdit: '2023.09.13.',
    },
  ];

  return (
    <ShortcutContainer>
      <TitleLine>
        <Title>바로가기</Title>
        <Height30 />
      </TitleLine>
      <TabList
        onClick={(e) => {
          const tar = e.target as HTMLElement;
          if (tar.textContent === '문서') {
            setClkTab([1, 0]);
          } else {
            setClkTab([0, 1]);
          }
        }}
      >
        {clkTab.map((v, i) => {
          return v === 1 ? ( //
            <TabBtnClk>{['문서', '갤러리'][i]}</TabBtnClk> //
          ) : (
            <TabBtn>{['문서', '갤러리'][i]}</TabBtn>
          );
        })}
      </TabList>
      {clkTab[0] === 1 && (
        <Th>
          <Col>제목</Col>
          <Col>수정일</Col>
        </Th>
      )}
      <Tb>
        {clkTab[0] === 1 &&
          wikiPosts.map((wiki, idx) => {
            return (
              <Tr key={idx}>
                <Cell>
                  <DocText />
                  {wiki.title}
                  <FloatBtn>할 일 추가</FloatBtn>
                </Cell>
                <Cell>{wiki.recentEdit}</Cell>
              </Tr>
            );
          })}
        {clkTab[1] === 1 && '갤러리 로직 추가'}
      </Tb>
    </ShortcutContainer>
  );
}
