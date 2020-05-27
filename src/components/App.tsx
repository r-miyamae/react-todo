import React from "react";
import { Item, Todo } from "./Item";

function getUniqueStr() {
  var strong = 1000;
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  );
}

const App: React.FunctionComponent = () => {
  const [todo, setTodo] = React.useState<Todo>({
    id: "0",
    title: "",
    description: "",
  });
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [done_todo_ids, setDoneTodoIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    console.log("mount");
    console.log(todo);
    console.log(todos);
    console.log(done_todo_ids);
  }, []);

  React.useEffect(() => {
    console.log("update");
    console.log(todo);
    console.log(todos);
    console.log(done_todo_ids);
  }, [todo, todos, done_todo_ids]);

  const onClick = () => {
    console.log("add");
    console.log(todo);
    const target = { ...todo };
    target["id"] = getUniqueStr();
    setTodo(target);
    const targets = [...todos, target];
    console.log(targets);
    setTodos(targets);
  };

  const onChange = (key: "title" | "description") => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    {
      console.log("onchange");
      const target = { ...todo };
      target[key] = event.target.value;
      setTodo(target);
      console.log(todo);
    }
  };

  const toggleDone = (id: string) => () => {
    console.log("toggle");
    console.log(id);
    console.log(done_todo_ids);
    if (done_todo_ids.includes(id)) {
      const targets = done_todo_ids.filter((done_id) => {
        return done_id != id;
      });
      setDoneTodoIds([...targets]);
    } else {
      setDoneTodoIds([...done_todo_ids, id]);
    }
  };

  const onDelete = (id: string) => () => {
    console.log("delete");
    const targets = todos.filter((todo) => {
      return todo.id != id;
    });
    setTodos([...targets]);
  };

  return (
    <React.Fragment>
      <h1>Super TODO Practice</h1>
      <p>
        <label>
          タイトル
          <input type="text" onChange={onChange("title")} />
        </label>
      </p>
      <p>
        <label>
          内容
          <input type="text" onChange={onChange("description")} />
        </label>
      </p>
      <button onClick={onClick}>追加</button>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>
            {done_todo_ids.includes(todo.id) ? (
              <s>
                <Item todo={todo} />
              </s>
            ) : (
              <Item todo={todo} />
            )}
            <button onClick={toggleDone(todo.id)}>完了</button>
            <button onClick={onDelete(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default App;
