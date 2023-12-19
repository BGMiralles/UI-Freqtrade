// TextInput.js
import React from "react";

const TextInput = ({ value, onChange }) => (
  <input type="text" value={value} onChange={onChange} />
);

export default TextInput;
