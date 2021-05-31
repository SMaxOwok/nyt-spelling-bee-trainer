import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";

import "./ListItem.css";

export default function ListItem({ word, isPangram }) {
  const listItemClasses = classNames("ListItem", { "ListItem--pangram": isPangram });
  
  return <li className={listItemClasses}>{word}</li>
}

ListItem.propTypes = {
  word: propTypes.string.isRequired,
  isPangram: propTypes.bool.isRequired,
}