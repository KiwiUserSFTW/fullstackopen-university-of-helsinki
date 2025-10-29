const User = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
  };
  return (
    <div>
      <p> {user.name} logged in</p>
      <button onClick={handleLogout}> log out </button>
    </div>
  );
};

export default User;
