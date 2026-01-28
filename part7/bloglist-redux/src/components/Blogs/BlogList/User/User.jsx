const User = ({ user, setUser, setNotification }) => {
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
    setNotification({
      value: "you have been logout succesfull",
      type: "notification",
    });
  };
  return (
    <div>
      <p> {user.name} logged in</p>
      <button onClick={handleLogout}> log out </button>
    </div>
  );
};

export default User;
