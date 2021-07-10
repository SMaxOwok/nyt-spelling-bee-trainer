import React, { useState } from "react";
import propTypes from "prop-types";
import classNames from "classnames";

import Eye from "assets/images/eye.svg";
import EyeSlash from "assets/images/eye-slash.svg";

import "./ListItem.css";

export default function ListItem({ answersVisible, word, isPangram, isFound }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const listItemClasses = classNames("ListItem", {
    "ListItem--pangram": isPangram,
    "ListItem--found": isFound,
    "ListItem--answersVisible": !isFound && !isPangram && answersVisible,
    "ListItem--revealed": !isFound && isRevealed,
  });
  const icon = isRevealed ? EyeSlash : Eye;
  const handleVisibilityToggle = () => setIsRevealed((prev) => !prev);

  return (
    <li className={listItemClasses}>
      {word}{" "}
      {!isFound && (
        <img
          className="ListItem--toggle"
          src={icon}
          onClick={handleVisibilityToggle}
        />
      )}
    </li>
  );
}

ListItem.propTypes = {
  word: propTypes.string.isRequired,
  isPangram: propTypes.bool.isRequired,
  isFound: propTypes.bool.isRequired,
  answersVisible: propTypes.bool.isRequired,
};
