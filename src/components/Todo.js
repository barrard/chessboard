import styled from "styled-components";
import react, { useState, useEffect } from "react";
import {
  TodoCount,
  ListItemContainer,
  SmallText,
  AddTodoBtn,
  Input,
  TodoName,
  DoneBox,
} from "./SmallComponents.js";
//we still have a huge mungus component here
export default function Todo() {
  const [todoId, setTodoId] = useState(2);
  const [newTodo, setNewTodo] = useState("");
  const [allTodos, setAllTodos] = useState([
    {
      id: 1,
      todo: "Do stuff",
      completed: false,
      date: new Date().toLocaleString(),
    },
  ]);

  useEffect(() => {
    console.log("TODO LIST");
    console.log({ newTodo, allTodos });
  });
  return (
    //this is the main thing here
    <div>
      <h1>TODO COMPONENT</h1>
      {/* input and buttong and list could go into one? */}
      <TodoInput
        allTodos={allTodos}
        setNewTodo={setNewTodo}
        newTodo={newTodo}
      />
      <AddNewTodoBtn
        setTodoId={setTodoId}
        todoId={todoId}
        setNewTodo={setNewTodo}
        allTodos={allTodos}
        setAllTodos={setAllTodos}
        todo={newTodo}
      />
      {/* hmm, fancy? or what? */}
      <TodoList setAllTodos={setAllTodos} allTodos={allTodos} />
    </div>
  );
}

function TodoList({ allTodos, setAllTodos }) {
  let completedItems = allTodos.filter((todo) => todo.completed);
  let incompleteItems = allTodos.filter((todo) => !todo.completed);

  let completedTodoList = makeTodoList(completedItems, allTodos, setAllTodos);
  let incompleteTodoList = makeTodoList(incompleteItems, allTodos, setAllTodos);
  return [...incompleteTodoList, ...completedTodoList];
}

//this is really the only large one?
function makeTodoList(list, allTodos, setAllTodos) {
  return list.map((todo) => {
    const toggleDone = (todo) => {
      todo.completed = !todo.completed;
      let newList = [...allTodos];
      let index = newList.findIndex((t) => t.id === todo.id);
      newList[index] = todo;
      setAllTodos(newList);
    };
    return (
      <ListItemContainer key={todo.id}>
        <DoneBox type="checkbox" onChange={() => toggleDone(todo)} />
        <TodoCount>#{todo.id}</TodoCount>
        <TodoName completed={todo.completed}>{todo.todo}</TodoName>
        <DateTime date={todo.date} />
      </ListItemContainer>
    );
  });
} //hardly 20 lines

const DateTime = ({ date }) => {
  return <SmallText>{date}</SmallText>;
};

//26 lines...I think anymore and we would
function AddNewTodoBtn({
  setTodoId,
  todoId,
  setNewTodo,
  todo,
  setAllTodos,
  allTodos,
}) {
  let tooShort = todo.length < 4;

  const addTodo = () => {
    console.log({ allTodos });
    console.log({ todo });
    let newList = [
      ...allTodos,
      { todo, id: todoId, completed: false, date: new Date().toLocaleString() },
    ];
    setAllTodos(newList);
    setNewTodo("");
    setTodoId(todoId + 1);
  };
  return (
    <AddTodoBtn disabled={tooShort} onClick={addTodo} todo={todo}>
      {tooShort ? "Too Short" : "Add"}
    </AddTodoBtn>
  );
}

function TodoInput({ newTodo, setNewTodo }) {
  function updateNewTodo(e) {
    const newTodo = e.target.value;
    console.log(newTodo);
    return setNewTodo(newTodo);
  }

  return <Input value={newTodo} onInput={updateNewTodo} />;
}
