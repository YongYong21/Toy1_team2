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
interface SidebarProps {}

interface MenuItem {
  icon: JSX.Element;
  text: string;
  timeStamp?: string;
  url?: string;
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
interface Data {
  title: string;
  items: any[];
  id: number;
  timeStamp: string;
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
  background-color: ${(props) => (props.clickItem ? "#43618f" : "")};
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

function 함수() {
  // 생성하는 함수
  // firestore.collection("sidebarMenu")
  //   .add({
  //     id: 0,
  //     title: "회사생활",
  //     items: [
  //       { text: "회사 내규", content: '회사 내규', timeStamp: '2023-09-08 15:00', url:'rule'},
  //       { text: "팀 소개", content: '팀 소개', timeStamp: '2023-09-08 15:00',url:'information'},
  //       { text: "조직도", content: '조직도', timeStamp: '2023-09-08 15:00',url:'team'}
  //     ]
  //   })
  //   .then((docRef) => {
  //     console.log("Document written with ID: ", docRef.id);
  //   })
  //   .catch((error) => {
  //     console.error("Error adding document: ", error);
  //   });
  // 가지고오기
  // var docRef = firestore.collection("sidebarMenu").doc("test");
  // docRef
  //   .get()
  //   .then((doc) => {
  //     if (doc.exists) {
  //       console.log("Document data:", doc.data());
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   })
  //   .catch((error) => {
  //     console.log("Error getting document:", error);
  //   });
}
// 함수();

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
              {item.icon}
              {item.text}
            </ItemContainer>
          </Link>
        ))}
    </MenuContainer>
  );
}

function Sidebar(props: SidebarProps) {
  const [data, setData] = useState<Data>();
  const [content, setContent] = useState();
  const [menu, setMenu] = useState<any[]>([]);
  useEffect(() => {
    firestore
      .collection("sidebarMenu")
      .get()
      .then((querySnapshot) => {
        const copy = [...menu];

        querySnapshot.forEach((doc) => {
          copy.push(doc.data());
        });
        copy.sort((a, b) => a.id - b.id);
        setMenu(copy);
        setClickItem(copy.map((menu) => Array(menu.items.length).fill(false)));
      });
  }, []);

  // console.log(menu)
  // const menuData: MenuSectionProps[] = menu;

  // const menuData: MenuSectionProps[] = [
  //   {
  //     id: 0,
  //     title: "회사생활",
  //     items: [
  //       { icon: <AiTwotoneContainer />, text: "회사 내규" },
  //       { icon: <AiOutlineUser />, text: "팀 소개" },
  //       { icon: <AiOutlineUsergroupDelete />, text: "조직도" },
  //     ],
  //   },
  //   {
  //     id: 1,
  //     title: "프로젝트",
  //     items: [
  //       { icon: <AiTwotoneContainer />, text: "진행중인 프로젝트" },
  //       { icon: <AiOutlineUser />, text: "예정된 프로젝트" },
  //       { icon: <AiOutlineUsergroupDelete />, text: "완료된 프로젝트" },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: "온보딩",
  //     items: [
  //       { icon: <AiTwotoneContainer />, text: "신입사원 필독서" },
  //       { icon: <AiOutlineUser />, text: "온보딩 주제" },
  //     ],
  //   },
  // ];
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
