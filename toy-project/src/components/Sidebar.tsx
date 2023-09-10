import React, { useState } from "react";
import styled from "styled-components";
import {
  AiOutlineDown,
  AiOutlineUp,
  AiTwotoneContainer,
  AiOutlineUser,
  AiOutlineUsergroupDelete,
} from "react-icons/ai";

interface SidebarProps {}

interface MenuItem {
  icon: JSX.Element;
  text: string;
}

interface MenuSectionProps {
  id: number;
  title: string;
  items: MenuItem[];
}

interface ItemContainerProps {
  clickItem: boolean;
}

interface HandleClickProps {
  clickItem: boolean[][];
  onItemClick: (sectionIndex: number, itemIndex: number) => void;
}

const SidebarContainer = styled.div`
  width: 256px;
  height: 1024px;
  background-color: #2a2f4a;
  color: #e5e9ed;
  padding: 24px 20px 0px;
`;

const MenuContainer = styled.div`
  margin-bottom: 32px;
`;

const TitleContainer = styled.div`
  height: 28px;
  padding: 5px 8px;
  font-size: 12px;
  border-bottom: 1px solid #e5e9ed;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const ItemContainer = styled.div<ItemContainerProps>`
  background-color: ${(props) =>
    props.clickItem ? "#43618f" : ""};
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
    background-color: #43618f;
    color: #fefefe;
  }
`;

function MenuSection({ id, title, items, clickItem, onItemClick }: MenuSectionProps & HandleClickProps) {
  const [clickTitle, setClickTitle] = useState(false);
  
  function handleClickTitle(){
    setClickTitle(!clickTitle)
  }
  return (
    <MenuContainer>
      <TitleContainer
        onClick={() => {
          handleClickTitle()
        }}
      >
        {title} {clickTitle ? <AiOutlineUp /> : <AiOutlineDown />}
      </TitleContainer>
      {!clickTitle &&
        items.map((item, index) => (
          <ItemContainer key={index} clickItem={clickItem[id][index]} onClick={() => { onItemClick(id, index) }}>
            {item.icon}
            {item.text}
          </ItemContainer>
        ))}
    </MenuContainer>
  );
}

function Sidebar(props: SidebarProps) {
  const menuData: MenuSectionProps[] = [
    {
      id: 0,
      title: "회사생활",
      items: [
        { icon: <AiTwotoneContainer />, text: "회사 내규" },
        { icon: <AiOutlineUser />, text: "팀 소개" },
        { icon: <AiOutlineUsergroupDelete />, text: "조직도" },
      ],
    },
    {
      id: 1,
      title: "프로젝트",
      items: [
        { icon: <AiTwotoneContainer />, text: "진행중인 프로젝트" },
        { icon: <AiOutlineUser />, text: "예정된 프로젝트" },
        { icon: <AiOutlineUsergroupDelete />, text: "완료된 프로젝트" },
      ],
    },
    {
      id: 2,
      title: "온보딩",
      items: [
        { icon: <AiTwotoneContainer />, text: "신입사원 필독서" },
        { icon: <AiOutlineUser />, text: "온보딩 주제" },
      ],
    },
    
  ];


  const [clickItem, setClickItem] = useState(menuData.map((menu) =>
  Array(menu.items.length).fill(false)
  ));
  
function handleClickItem(sectionIndex: number, itemIndex: number) {
  const copy = [...clickItem.map((arr)=>arr.map(()=>false))];
  copy[sectionIndex][itemIndex] = !copy[sectionIndex][itemIndex];
  setClickItem(copy);
}
  
  return (
    <SidebarContainer>
      {menuData.map((menu, index) => (
        <MenuSection key={index} id = {menu.id} title={menu.title} items={menu.items} clickItem = {clickItem}  onItemClick={handleClickItem} />
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;
