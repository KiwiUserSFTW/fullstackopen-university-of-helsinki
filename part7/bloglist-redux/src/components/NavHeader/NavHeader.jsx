// styles
import { Nav, Navbar, NavItem } from "react-bootstrap";

// components
import NavTabs from "./NavTabs";
import UserStatus from "./UserStatus";

const NavHeader = () => {
  return (
    <Navbar expand="xxl" className="justify-content-center ">
      <Nav
        variant="tabs"
        className="d-flex justify-content-center flex-row gap-3 fs-3"
      >
        <NavTabs />
        <NavItem className="d-flex align-items-center">
          <UserStatus />
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default NavHeader;
