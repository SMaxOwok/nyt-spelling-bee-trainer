import React from "react";
import propTypes from "prop-types";

import ListItem from "./ListItem";

import "./List.css";

export default function List({ answers, pangrams }) {
  return (
    <ul className="List">
      {answers.map(answer => <ListItem key={answer} word={answer} isPangram={pangrams.includes(answer)} />)}
    </ul>
  );
}

List.propTypes = {
  answers: propTypes.array.isRequired,
  pangrams: propTypes.array.isRequired,
}