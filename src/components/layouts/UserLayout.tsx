import UserNavbar from "../headers/Navbar";
import UserFooter from "../footers/Footer";

interface UserLayoutProps {
  children: React.ReactNode;
}

import React from "react";

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div>
      <UserNavbar />
      {children}
      <UserFooter />
    </div>
  );
};

export default UserLayout;