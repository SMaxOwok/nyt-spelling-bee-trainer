import React from "react";
import propTypes from "prop-types";

import { groupByLength } from "helpers";

import ListItem from "./ListItem";

import "./List.css";

export default function List({ answers, pangrams, sortBy }) {
  const words = sortBy === "length" ? groupByLength(answers) : answers;

  return (
    <ul className="List">
      {words.map((answer) => (
        <ListItem
          key={answer}
          word={answer}
          isPangram={pangrams.includes(answer)}
        />
      ))}
    </ul>
  );
}

List.propTypes = {
  answers: propTypes.array.isRequired,
  pangrams: propTypes.array.isRequired,
  sortBy: propTypes.oneOf(["alpha", "length"])
}