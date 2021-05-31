import React from "react";
import propTypes from "prop-types";
import Select from "react-select";

import "./Controls.css";

const sortOptions = [{ value: "alpha", label: "Alphabetical" }, { value: "length", label: "Length"}];

export default function Controls({ sort, isRevealed, onSort, onReveal }) {
  return (
    <div className="Controls">
      <Select
        className="Controls__Sort"
        options={sortOptions}
        value={sort}
        onChange={onSort}
      />

      <button className="Controls__Button" onClick={() => onReveal(!isRevealed)}>
        {isRevealed ? "Hide answers" : "Show answers"}
      </button>
    </div>
  );
}

Controls.propTypes = {
  sort: propTypes.object.isRequired,
  isRevealed: propTypes.bool.isRequired,
  onSort: propTypes.func.isRequired,
  onReveal: propTypes.func.isRequired
};