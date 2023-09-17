import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { firestore } from "../api/firebase";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { JsxElement } from "typescript";
import { theme } from "./../styles/Theme";

interface ContentsProps {}
interface Data {
  title: string;
  items: any[];
  id: number;
  timeStamp: string;
}
const ContentsContainer = styled.div`
  width: 1280px;
  padding: 20px 30px 0px;
`;
const TitleDiv = styled.div`
  width: 1000px;
  height: 52px;
  font-size: 36px;
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
  font-size: 16px;
  padding: 8px;
`;
const EditBtn = styled.button``;
const ContentsDiv = styled.div`
  padding: 8px;
`;

function Contents(props: ContentsProps) {
  const { id } = useParams();
  const [data, setData] = useState<any | null>(null); // Use a more specific type if possible

  useEffect(() => {
    firestore
      .collection("sidebarMenu")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const items = doc.data().items;
          // let copy = [...db];

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
