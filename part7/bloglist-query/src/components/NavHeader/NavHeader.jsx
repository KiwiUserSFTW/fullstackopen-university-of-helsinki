// components
import UserStatus from "./UserStatus";
import NavTabs from "./NavTabs";

const NavHeader = () => {
  return (
    <nav className="navbar is-dark m-3">
      <div className="navbar-brand">
        <div className="navbar-item">
          <NavTabs />
        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <UserStatus />
        </div>
      </div>
    </nav>
  );
};

export default NavHeader;
