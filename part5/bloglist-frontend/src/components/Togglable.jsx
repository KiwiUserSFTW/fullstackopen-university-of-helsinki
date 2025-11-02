import { useState, useImperativeHandle } from "react";

const Togglable = ({ children, buttonLabel, ref }) => {
  const [visible, setVisible] = useState(false);
  const fieldVisible = (v) => ({ display: v ? "none" : "" });

  const handleToggle = () => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return { handleToggle };
  });

  return (
    <div>
      <div style={fieldVisible(visible)}>
        <button onClick={handleToggle}>{buttonLabel}</button>
      </div>
      <div style={fieldVisible(!visible)}>
        {children}
        <button onClick={handleToggle}>cancel</button>
      </div>
    </div>
  );
};

export default Togglable;
