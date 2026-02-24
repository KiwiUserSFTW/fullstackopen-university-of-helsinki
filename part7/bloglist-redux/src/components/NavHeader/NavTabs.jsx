// styles
import { NavItem, NavLink } from "react-bootstrap";

// react
import { useLocation } from "react-router-dom";

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
    <NavItem>
      <div style={{ gap: "5px", display: "flex" }}>
        {Object.values(tabs).map(({ name, link }) => (
          <NavLink
            key={name}
            href={link}
            active={location.pathname === link}
            className={`${location.pathname === link ? "bg-secondary text-white px-3" : "text-red"}`}
          >
            {name}
          </NavLink>
        ))}
      </div>
    </NavItem>
  );
};

export default NavTabs;
