import React from "react";
import { Container, Image, Button, Badge } from "react-bootstrap";
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiSlash,
  FiPhoneCall,
  FiBriefcase,
} from "react-icons/fi";
import moment from "moment";

const sidebarLinks = [
  // {
  //   name: "Dashboard",
  //   url: "/",
  //   icon: <FiHome />,
  // },
  {
    name: "Resident Records",
    url: "/resident-records",
    icon: <FiUsers />,
  },
  {
    name: "Resident Complaints",
    url: "/resident-complaints",
    icon: <FiSlash />,
  },
  {
    name: "Resident Certificates",
    url: "/resident-certificates",
    icon: <FiFileText />,
  },
  {
    name: "Resident Certificate Requests",
    url: "/resident-certificate-requests",
    icon: <FiFileText />,
  },
];

export const DashboardSidebarNavigation = (props) => {
  const { handleNavigate, handleLogout } = props;

  const [collapsible, setCollapsible] = React.useState(true);

  const getCurrentDatetime = () => {
    return moment().format("MMMM D, YYYY");
  };

  return (
    <Container
      fluid
      className={`dashboard-sidebar ${
        collapsible ? "dasbboard-sidebar-collapsible" : ""
      }`}
    >
      <Container fluid className="header">
        <div className="d-flex justify-content-center align-items-center">
          <Image
            fluid
            src="/assets/images/pitogo-seal.png"
            alt="Brgy.pitogo logo"
            height={100}
            width={100}
          />
          &nbsp; &nbsp;
          <p className="fw-bold mt-3">PITOGO PORTAL</p>
        </div>

        <Container fluid className="text-content mt-3">
          <p className="mb-0">
            User Role &mdash; <Badge bg="danger">ADMIN</Badge>
          </p>
          <p className="mb-3">{getCurrentDatetime()}</p>

          <Button variant="warning" onClick={handleLogout}>
            Log Out
          </Button>
        </Container>
      </Container>

      <hr />

      <Container fluid className="body">
        <p className="title">&mdash; Manage</p>

        {sidebarLinks.map((_) => (
          <Button
            key={`${_.name}-btn-link`}
            title={_.name}
            onClick={() => handleNavigate(_.url)}
          >
            <span className="icon">{_.icon}</span>
            <span className="name">{_.name}</span>
          </Button>
        ))}
      </Container>
    </Container>
  );
};
