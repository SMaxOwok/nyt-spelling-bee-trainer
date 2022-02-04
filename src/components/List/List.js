import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";

import { sortByLength } from "helpers";

import ListItem from "./ListItem";

import "./List.css";

export default function List({
  answers,
  answersVisible,
  pangrams,
  found,
  sortBy,
}) {
  const listClasses = classNames("List", {
    "List--answersVisible": answersVisible,
  });
  const words = sortBy === "length" ? sortByLength(answers) : answers.sort();

  return (
    <ul className={listClasses}>
      {words.map((answer) => (
        <ListItem
          key={answer}
          answersVisible={answersVisible}
          word={answer}
          isPangram={pangrams.includes(answer)}
          isFound={found.includes(answer)}
        />
      ))}
    </ul>
  );
}

List.propTypes = {
  answers: propTypes.array.isRequired,
  pangrams: propTypes.array.isRequired,
  found: propTypes.array.isRequired,
  sortBy: propTypes.oneOf(["alpha", "length"]),
  answersVisible: propTypes.bool.isRequired,
};
