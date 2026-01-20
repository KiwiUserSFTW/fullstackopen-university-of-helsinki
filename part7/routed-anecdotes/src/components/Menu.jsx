import { Link } from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };

  const routes = [
    { label: "anecdotes", to: "/anecdotes" },
    { label: "create", to: "/create" },
    { label: "about", to: "/about" },
  ];

  return (
    <div>
      <div>
        {routes.map(({ label, to }) => (
          <Link key={label} style={padding} to={to}>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
