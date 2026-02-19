// components
import UserStatus from "./UserStatus";
import NavTabs from "./NavTabs";

const NavHeader = () => {
  return (
    <div
      style={{
        height: "20px",
        display: "flex",
        gap: "5px",
        backgroundColor: "#D3D3D3",
        padding: "5px",
        borderRadius: "10px"
      }}
    >
      <NavTabs />
      <UserStatus />
    </div>
  );
};

export default NavHeader;
