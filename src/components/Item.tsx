import React from "react";

export type Todo = {
  id: string;
  title: string;
  description: string;
  labels: Label[];
};

export type Label = {
  id: string;
  name: string;
};

type Props = {
  todo: Todo;
};

type LabelProps = {
  label: Label;
};

export const Item: React.FunctionComponent<Props> = ({ todo }) => (
  <div>
    <p>
      {todo.id}: {todo.title}: {todo.description}
    </p>
  </div>
);

export const LabelItem: React.FunctionComponent<LabelProps> = ({ label }) => (
  <div>
    <p>
      {label.id}: {label.name}
    </p>
  </div>
);
