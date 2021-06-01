import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";

import "./ListItem.css";

export default function ListItem({ word, isPangram, isFound, isRevealed }) {
  const listItemClasses = classNames("ListItem", { 
    "ListItem--pangram": isPangram, 
    "ListItem--found": isFound, 
    "ListItem--revealed": (!isFound && !isPangram) && isRevealed 
  });
  
  return <li className={listItemClasses}>{word}</li>
}

ListItem.propTypes = {
  word: propTypes.string.isRequired,
  isPangram: propTypes.bool.isRequired,
  isFound: propTypes.bool.isRequired,
  isRevealed: propTypes.bool.isRequired,
}