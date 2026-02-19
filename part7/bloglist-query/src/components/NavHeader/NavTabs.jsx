// react-router
import { Link } from "react-router-dom";

const NavTabs = () => {
  const tabs = {
    blogs: {
      name: "blogs",
      link: "/",
    },
    users: {
      name: "users",
      link: "/users",
    },
  };

  return (
    <div style={{ gap: "5px", display: "flex" }}>
      {Object.values(tabs).map(({ name, link }) => (
        <Link key={name} to={link}>
          {name}
        </Link>
      ))}
    </div>
  );
};

export default NavTabs;
