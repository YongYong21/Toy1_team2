import { useState, useEffect } from 'react';

import {
  ShortcutContainer,
  Height30,
  ShortcutCell,
  ShortcutCol,
} from '../../styles/Home/ShortcutSC';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../api/firebase';

import {
  TabBtn,
  TabBtnClk,
  TabList,
  Title,
  TitleLine,
  Th,
  Tb,
  Tr,
  DocText,
  FloatBtn,
} from '../../styles/Home/TodoListSC';
import { ShortcutGallery } from './ShortcutGallery';

interface TaskProps {
  todo: Array<[string, number, string, string]>;
  setTodo: React.Dispatch<Array<[string, number, string, string]>>;
  setTabMenu: React.Dispatch<number[]>;
  setTglEditTodo: React.Dispatch<boolean[]>;
}

interface wikiProps {
  id: string;
  content: string;
  timeStamp: string;
  title: string;
}

export function Shortcut({
  todo, //
  setTodo,
  setTabMenu,
  setTglEditTodo,
}: TaskProps): JSX.Element {
  // const [addFocus, setAddFocus] = useState(false);
  const [clkTab, setClkTab] = useState([1, 0]);
  const navigate = useNavigate();

  const wikiPosts = [
    {
      title: '회사 내규',
      url: 'rules',
    },
    {
      title: '팀 소개',
      url: 'information',
    },
    {
      title: '조직도',
      url: 'team',
    },
    {
      title: '진행중인 프로젝트',
      url: 'ongoing',
    },
    {
      title: '예정된 프로젝트',
      url: 'scheduled',
    },
    {
      title: '완료된 프로젝트',
      url: 'completed',
    },
    {
      title: '신입사원 필독서',
      url: 'read',
    },
    {
      title: '온보딩 주제',
      url: 'must-read',
    },
  ];
  const [dbWiki, setDbWiki] = useState<wikiProps[]>([]);

  useEffect((): void => {
    const bucket = firestore.collection('Wiki');

    const fetchData = async (): Promise<void> => {
      try {
        const querySnapshot = await bucket.get();
        const docList: wikiProps[] = [];

        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            const data = doc.data();
            const temp = data.timeStamp.split(' ')[0];
            const spl = temp.split('-').slice(0, 3).join('.');

            docList.push({
              id: doc.id,
              content: data.content,
              timeStamp: spl,
              title: data.title,
            });
          }
        });
        setDbWiki(docList);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    void fetchData();
  }, []);

  const makeNewTodo = //
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      const tar = e.target as HTMLElement;
      const tarText = tar.dataset.id as string;

      setTabMenu([1, 0]);
      const newTodo = todo.slice();
      newTodo.unshift([
        //
        '',
        new Date().getTime(),
        tarText,
        `${new Date().getFullYear()} ${new Date().getMonth()} ${new Date().getDate()} ${new Date().getDay()}`,
      ]);
      setTodo(newTodo);
      setTglEditTodo([true]);

      const strfied = JSON.stringify(newTodo);
      localStorage.setItem('todo', strfied);
    };

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
            <TabBtnClk key={i}>{['문서', '갤러리'][i]}</TabBtnClk> //
          ) : (
            <TabBtn key={i}>{['문서', '갤러리'][i]}</TabBtn>
          );
        })}
      </TabList>
      {clkTab[0] === 1 && (
        <Th>
          <ShortcutCol>제목</ShortcutCol>
          <ShortcutCol>수정일</ShortcutCol>
        </Th>
      )}
      {clkTab[0] === 1 && (
        <Tb>
          {wikiPosts.map((wiki, idx) => {
            return (
              <Tr key={idx}>
                <ShortcutCell
                  onClick={() => {
                    navigate(`/wiki/${wiki.url}`);
                  }}
                >
                  <DocText />
                  {wiki.title}
                  <FloatBtn data-id={wiki.title} onClick={makeNewTodo}>
                    할 일 추가
                  </FloatBtn>
                </ShortcutCell>
                <ShortcutCell>
                  {dbWiki[idx] !== undefined
                    ? dbWiki[idx].timeStamp
                    : '2023.09.16'}
                </ShortcutCell>
              </Tr>
            );
          })}
        </Tb>
      )}
      {clkTab[1] === 1 && <ShortcutGallery />}
    </ShortcutContainer>
  );
}
