const User = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
  };
  return (
    <div>
      <p1> {user.name} logged in</p1>
      <button onClick={handleLogout}> log out </button>
    </div>
  );
};

export default User;
