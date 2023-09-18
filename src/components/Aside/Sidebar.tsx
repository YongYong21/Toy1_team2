import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

import { firestore } from '../../api/firebase';
import { Link } from 'react-router-dom';
import { theme } from '../../styles/Theme';

interface MenuSectionProps {
  id: number;
  title: string;
  items: MenuItem[];
  url?: string;
}

interface MenuItem {
  text: string;
  timeStamp: string;
  url: string;
}

interface ItemContainerProps {
  clickItem: boolean;
}

interface HandleClickProps {
  clickItem: boolean[][];
  onItemClick: (sectionIndex: number, itemIndex: number) => void;
}

const SidebarContainer = styled.div`
  min-width: 256px;
  height: 1024px;
  background-color: ${theme.blueBg3};
  color: ${theme.gray300};
  padding: 24px 20px 0px;
`;

const MenuContainer = styled.div`
  margin-bottom: 32px;
`;

const TitleContainer = styled.div`
  height: 28px;
  padding: 5px 8px;
  font-size: ${theme.textStyles.caption.fontSize};
  line-height: ${theme.textStyles.caption.lineHeight};
  border-bottom: 1px solid #e5e9ed;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const ItemContainer = styled.div<ItemContainerProps>`
  background-color: ${(props) => (props.clickItem ? theme.blueBg1 : '')};
  font-size: 15px;
  margin-bottom: 6px;
  padding: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    margin-right: 12px;
  }
  &:hover {
    background-color: ${theme.blueBg1};
    color: #fefefe;
  }
`;

function MenuSection({
  id,
  title,
  items,
  clickItem,
  onItemClick,
  url,
}: MenuSectionProps & HandleClickProps): JSX.Element {
  // 사이드바에 있는 회사 생활, 프로젝트, 온보딩과 같은 제목 타이틀
  const [clickTitle, setClickTitle] = useState(false);

  function handleClickTitle(): void {
    setClickTitle(!clickTitle);
  }

  return (
    <MenuContainer>
      <TitleContainer
        onClick={() => {
          handleClickTitle();
        }}
      >
        {title} {clickTitle ? <AiOutlineUp /> : <AiOutlineDown />}
      </TitleContainer>
      {/* 타이틀을 클릭했을 경우, 메뉴들을 안보여지게 합니다. */}
      {!clickTitle &&
        items.map((item, index) => (
          // url 주소 이동
          <Link key={item.url} to={`/${url}/${item.url}`}>
            <ItemContainer
              key={index}
              clickItem={clickItem[id][index]}
              onClick={() => {
                onItemClick(id, index);
              }}
            >
              {item.text}
            </ItemContainer>
          </Link>
        ))}
    </MenuContainer>
  );
}

function Sidebar({ url }: { url: string }): JSX.Element {
  const [menu, setMenu] = useState<MenuSectionProps[]>([]);
  useEffect(() => {
    // firebase에 있는 sidebarMenu에 대한 정보 가져오기
    firestore
      .collection('sidebarMenu')
      .get()
      .then((querySnapshot) => {
        const copy = [...menu];

        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          const menuSection: MenuSectionProps = {
            id: docData.id,
            title: docData.title,
            items: docData.items,
          };
          copy.push(menuSection);
        });
        copy.sort((a, b) => a.id - b.id);
        setMenu(copy);
        setClickItem(copy.map((menu) => Array(menu.items.length).fill(false)));
      })
      .catch((error) => {
        console.error('Firebase 데이터 가져오기 오류:', error);
      });
  }, []);

  const [clickItem, setClickItem] = useState(
    menu?.map((menu) => Array(menu.items.length).fill(false)),
  );
  // 클릭한 부분이 어떠한 데이터인지 확인해주는 함수
  function handleClickItem(sectionIndex: number, itemIndex: number): void {
    const copy = [...clickItem.map((arr) => arr.map(() => false))];
    copy[sectionIndex][itemIndex] = !copy[sectionIndex][itemIndex];
    setClickItem(copy);
  }

  return (
    <SidebarContainer>
      {menu?.map((menu, index) => (
        <MenuSection
          key={index}
          id={menu.id}
          title={menu.title}
          items={menu.items}
          clickItem={clickItem}
          onItemClick={handleClickItem}
          // pages에서 props 받은 url
          url={url}
        />
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;
