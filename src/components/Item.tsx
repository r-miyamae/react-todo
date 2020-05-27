import React from "react";

export type Todo = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  todo: Todo;
};

export const Item: React.FunctionComponent<Props> = ({ todo }) => (
  <div>
    <p>
      {todo.id}: {todo.title}: {todo.description}
    </p>
  </div>
);
