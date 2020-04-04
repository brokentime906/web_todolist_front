import React from "react";
import styled from "styled-components";

const TitleBlock = styled.div`
  margin-top: 200px;
  color: white;
  background: skyblue;
  font-size: 18px;
  width: 350px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* box-shadow: 0 0 0 2px gray; */
`;

const Title = () => {
  return (
    <TitleBlock>
      <div>Todo List</div>
    </TitleBlock>
  );
};
export default Title;
