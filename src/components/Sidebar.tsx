import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  AiOutlineDown,
  AiOutlineUp,
  AiTwotoneContainer,
  AiOutlineUser,
  AiOutlineUsergroupDelete,
} from "react-icons/ai";

import { firestore } from "../api/firebase";
import { Link } from "react-router-dom";
import { theme } from './../styles/Theme';

interface SidebarProps {}

interface MenuSectionProps {
  id: number;
  title: string;
  items: MenuItem[];
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
  width: 256px;
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
  background-color: ${(props) => (props.clickItem ? theme.blueBg1 : "")};
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
}: MenuSectionProps & HandleClickProps) {
  const [clickTitle, setClickTitle] = useState(false);

  function handleClickTitle() {
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
      {!clickTitle &&
        items.map((item, index) => (
          <Link to={`/wiki/${item.url}`}>
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

function Sidebar(props: SidebarProps) {
  const [menu, setMenu] = useState<MenuSectionProps[]>([]);
  useEffect(() => {
    firestore
      .collection("sidebarMenu")
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
      });
  }, []);

  const [clickItem, setClickItem] = useState(
    menu?.map((menu) => Array(menu.items.length).fill(false))
  );

  function handleClickItem(sectionIndex: number, itemIndex: number) {
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
        />
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;
