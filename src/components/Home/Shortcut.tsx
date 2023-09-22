import { useState, useEffect } from 'react';

import {
  ShortcutContainer,
  Height30,
  ShortcutCell,
  ShortcutCol,
} from '../../styles/Home/ShortcutSC';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../shared/api/firebase';

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
import { useAuthState } from '../../shared/contexts/AuthContext';

interface TaskProps {
  todo: Array<[string, number, string, string]>;
  setTodo: React.Dispatch<Array<[string, number, string, string]>>;
  setTabMenu: React.Dispatch<number[]>;
  setTglEditTodo: React.Dispatch<boolean[]>;
}

interface wikiProps {
  content: string;
  timeStamp: string;
  text: string;
  url: string;
}

export function Shortcut({
  todo, //
  setTodo,
  setTabMenu,
  setTglEditTodo,
}: TaskProps): JSX.Element {
  const authState = useAuthState(); // 인증 컨텍스트에서 인증 상태 가져오기
  const [clkTab, setClkTab] = useState([1, 0]);
  const navigate = useNavigate();

  const [dbWiki, setDbWiki] = useState<wikiProps[]>([]);

  useEffect((): void => {
    const bucket = firestore.collection('sidebarMenu');

    const fetchData = async (): Promise<void> => {
      try {
        const querySnapshot = await bucket.get();
        const docList: wikiProps[] = [];

        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            const data = doc.data();
            const tar = data.items;

            tar.forEach((parsed: any) => {
              // console.log(parsed);
              console.log(parsed.text, 'parsed.text');
              if (parsed.timeStamp !== undefined) {
                const temp = parsed.timeStamp.split(' ')[0];
                const spl = temp.split('-').slice(0, 3).join('.');
                docList.push({
                  content: parsed.content,
                  timeStamp: spl,
                  text: parsed.text,
                  url: parsed.url,
                });
              } else {
                const spl = '2023.09.22';
                docList.push({
                  content: parsed.content,
                  timeStamp: spl,
                  text: parsed.text,
                  url: parsed.url,
                });
              }
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
      if (authState.state !== 'loaded' || !authState.isAuthentication) {
        return;
      }
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
          {dbWiki.map((wiki, idx) => {
            return (
              <Tr key={idx}>
                <ShortcutCell
                  onClick={() => {
                    navigate(`/wiki/${wiki.url}`);
                  }}
                >
                  <DocText />
                  {wiki !== undefined ? wiki.text : `문서 ${idx}`}
                  <FloatBtn data-id={wiki.text} onClick={makeNewTodo}>
                    할 일 추가
                  </FloatBtn>
                </ShortcutCell>
                <ShortcutCell>
                  {wiki !== undefined ? wiki.timeStamp : '2023.09.16'}
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
