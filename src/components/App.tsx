import React from "react";
import { Item, Todo, Label, LabelItem } from "./Item";

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
    labels: [],
  });
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [done_todo_ids, setDoneTodoIds] = React.useState<string[]>([]);

  const [label, setLabel] = React.useState<Label>({
    id: "0",
    name: "",
  });
  const [labels, setLabels] = React.useState<Label[]>([]);

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
    console.log(label);
  }, [todo, todos, done_todo_ids, label, labels]);

  const onClick = (resource: "todo" | "label") => () => {
    console.log("add");
    if (resource === "todo") {
      console.log(todo);
      const target = { ...todo };
      target["id"] = getUniqueStr();
      // setTodo(target);
      const targets = [...todos, target];
      console.log(targets);
      setTodos(targets);
    } else {
      const target = { ...label };
      target["id"] = getUniqueStr();
      const targets = [...labels, target];
      console.log(labels);
      setLabels(targets);
    }
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

  const onLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("labelchange");
    const target = { ...label };
    target["name"] = event.target.value;
    setLabel(target);
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
      <div>
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
        <button onClick={onClick("todo")}>追加</button>
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
      </div>
      <div>
        <label>
          ラベル
          <input
            type="text"
            placeholder="ラベル名を入れる"
            onChange={onLabelChange}
          />
        </label>
        <button onClick={onClick("label")}>追加</button>
        <ul>
          {labels.map((label, i) => (
            <li key={i}>
              <LabelItem label={label} />
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default App;
