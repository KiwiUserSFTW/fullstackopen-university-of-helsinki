// react-router
import { Link, useLocation } from "react-router-dom";

const NavTabs = () => {
  const location = useLocation();

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
    <ul className="tabs " style={{ gap: "5px", display: "flex" }}>
      {Object.values(tabs).map(({ name, link }) => (
        <li
          key={name}
          className={`${location.pathname === link && "is-active"}`}
        >
          <div className="my-1 field is-grouped">
            <Link className ="mx-3"to={link}>{name}</Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NavTabs;
