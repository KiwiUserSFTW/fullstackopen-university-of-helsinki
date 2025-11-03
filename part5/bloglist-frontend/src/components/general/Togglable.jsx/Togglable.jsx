const Togglable = ({ children, visible = false }) => {
  return <div style={{ display: visible ? " " : "none" }}>{children}</div>;
};

export default Togglable;
