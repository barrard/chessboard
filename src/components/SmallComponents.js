import styled from "styled-components";
export const TodoCount = styled.span`
  /* font-weight:bold; */
  font-size: 25px;
  padding: 5px;
`;
export const TodoName = styled.h4`
  display: inline;
  padding: 3px;
  text-decoration: ${({ completed }) =>
    completed ? "line-through" : "underline"};
`;

export const DoneBox = styled.input`
  display: inline;
  height: 20px;
  width: 20px;
`;
//now you are ...we still ended up with 
export const ListItemContainer = styled.div`
  padding: 10px;
  border: 1px solid red;
`;
export const SmallText = styled.span`
  font-size: 10px;
`;
export const AddTodoBtn = styled.button`
  color: white;
  background-color: ${({ todo }) => (todo.length < 4 ? "red" : "green")}; //wow
`;
export const Input = styled.input`
  //some styles?
  font-size: 20px;
`;
