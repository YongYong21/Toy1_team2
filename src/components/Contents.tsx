import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { firestore } from "../api/firebase";
import { useParams } from "react-router-dom";

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

  console.log(data);
  return (
    <ContentsContainer>
      <TitleDiv>{data?.text}</TitleDiv>
      <TimeStampWrap>
        <TimeStampDiv>글작성 날짜: {data?.timeStamp}</TimeStampDiv>
        <EditBtn>글 수정</EditBtn>
      </TimeStampWrap>
      <ContentsDiv>{data?.content}</ContentsDiv>
    </ContentsContainer>
  );
}

export default Contents;
