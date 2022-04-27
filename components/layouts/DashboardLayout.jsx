import React from "react";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";

import {
  DashboardSidebarNavigation,
  DashboardNavbarNavigation,
} from "components/navigations";
import { BreadcrumbBuilder } from "components/general";

const toastOptions = {
  style: {
    fontSize: "12px",
    color: "#252525",
  },
};

export const DashboardLayout = (props) => {
  const { title, children } = props;
  const [isAuthenticated] = React.useState(
    typeof window !== "undefined"
      ? Boolean(localStorage.getItem("authToken") !== null)
      : false
  );

  let router = useRouter();

  const handleNavigate = (url) => {
    router.push(url);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    router.replace("/auth/login");
  };

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  React.useEffect(() => {
    if (
      localStorage.getItem("authToken") === null &&
      localStorage.getItem("user") === null
    ) {
      window.location.replace("/auth/login");
    }
  }, []);

  if (!isAuthenticated)
    return (
      <Container fluid>
        <p>Redirecting ...</p>
      </Container>
    );

  return (
    <>
      <Head>
        <title>PITOGO &mdash; {title || "Dashboard"}</title>
      </Head>

      <Container fluid className="dashboard-layout">
        <DashboardSidebarNavigation
          handleNavigate={handleNavigate}
          handleLogout={handleLogout}
        />

        <Container fluid className="dashboard-content">
          <Container fluid className="dashboard-page-content">
            <Container className="dashboard-page-content-body">
              <Container fluid className="mb-4">
                <BreadcrumbBuilder />
                <h3 className="dashboard-page-title">{title || "Dashboard"}</h3>
              </Container>

              {children}
            </Container>
          </Container>

          <div className="copyright-container shadow-lg">
            &#169;
            <small>Baragay Pitogo Makati City {getCurrentYear()}</small>
          </div>
        </Container>
      </Container>
    </>
  );
};
