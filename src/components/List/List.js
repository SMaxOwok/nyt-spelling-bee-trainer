import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";

import Bee from "assets/images/spelling-bee.svg";
import { groupByLength } from "helpers";

import ListItem from "./ListItem";

import "./List.css";

export default function List({ answers, pangrams, found, sortBy, isRevealed }) {
  const isLoading = !answers.length;
  const listClasses = classNames("List", {
    "List--revealed": isRevealed,
    "List--loading": isLoading,
  });
  const words = sortBy === "length" ? groupByLength(answers) : answers;

  return (
    <ul className={listClasses}>
      {isLoading ? (
        <img className="List__Bee" src={Bee} />
      ) : (
        words.map((answer) => (
          <ListItem
            key={answer}
            word={answer}
            isPangram={pangrams.includes(answer)}
            isFound={found.includes(answer)}
            isRevealed={isRevealed}
          />
        ))
      )}
    </ul>
  );
}

List.propTypes = {
  answers: propTypes.array.isRequired,
  pangrams: propTypes.array.isRequired,
  found: propTypes.array.isRequired,
  sortBy: propTypes.oneOf(["alpha", "length"]),
  isRevealed: propTypes.bool.isRequired,
};
