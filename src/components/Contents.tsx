import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { firestore } from "../api/firebase";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { JsxElement } from "typescript";
import { theme } from './../styles/Theme';

interface ContentsProps {}
interface Data {
  timeStamp: string;
  text: string;
  content: string;
  url: string;
}
const ContentsContainer = styled.div`
  width: 1280px;
  padding: 20px 30px 0px;
`;
const TitleDiv = styled.div`
  width: 1000px;
  height: 52px;
  font-size: ${theme.textStyles.subtitle1.fontSize};
  line-height: ${theme.textStyles.subtitle1.lineHeight};
  padding: 8px;
  margin-bottom: 16px;
`;
const TimeStampWrap = styled.div`
  display: flex;
  margin-bottom: 16px;
`;
const TimeStampDiv = styled.div`
  width: 800px;
  height: 30px;
  font-size: ${theme.textStyles.subtitle5.fontSize};
  line-height: ${theme.textStyles.subtitle5.lineHeight};
  padding: 8px;
`;
const EditBtn = styled.button``;
const ContentsDiv = styled.div`
  padding: 8px;
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
function Contents(props: ContentsProps) {
  const { id } = useParams();
  const [data, setData] = useState<Data | null>(null); // Use a more specific type if possible

  useEffect(() => {
    firestore
      .collection("sidebarMenu")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const items = doc.data().items;
          for (const key in items) {
            if (items[key].url === id) {
              setData(items[key]);
              return;
            }
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, [id]);
  const [markdownText, setMarkdownText] = useState<string>("");
  const [previewMarkdown, setPreviewMarkdown] = useState<string>("");

  const MarkdownViewer = ({ markdownText }: { markdownText: string }) => {
    return (
      <div>
        <MarkdownPreview source={markdownText} />
      </div>
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    console.log(newText)
    setMarkdownText(newText);
    setPreviewMarkdown(newText);
  };
  const handleSaveClick = () => {
    
    // console.log(firestore.collection("sidebarMenu").doc('Ry903jgEiuNn72Bz8NZ7'))
    // firestore.collection("sidebarMenu").doc('Ry903jgEiuNn72Bz8NZ7').update({ [`items.0.content`]: MarkdownText})
    // firestore.collection("sidebarMenu").doc('Oa1Mk5TW1Q4gYw2budOr').update({ [`items.0.content`]: "진행중인 프로젝트",
    // [`items.0.text`]: "진행중인 프로젝트",
    // [`items.0.timeStamp`]: "2023-09-08 15:00",
    // [`items.0.url`]: "ongoing", })
    // firestore.collection("sidebarMenu").doc(id).update({ content: markdownText })
  };
  

  return (
    <ContentsContainer>
      <TitleDiv>{data?.text}</TitleDiv>
      <TimeStampWrap>
        <TimeStampDiv>글작성 날짜: {data?.timeStamp}</TimeStampDiv>
        <EditBtn>글 수정</EditBtn>
      </TimeStampWrap>
      <ContentsDiv>
      <MarkdownViewer markdownText={data?.content || ""} />
        <textarea onChange={onChange} value={markdownText}></textarea>
        <MarkdownViewer markdownText={markdownText || ""} />
        <button onClick={handleSaveClick}>저장</button>
      </ContentsDiv>
    </ContentsContainer>
  );
}

export default Contents;
