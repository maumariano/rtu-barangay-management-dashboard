import React from "react";
import { useRouter } from "next/router";
import {
  Container,
  ButtonGroup,
  Button,
  Card,
  Form,
  Badge,
} from "react-bootstrap";
import UserAvatar from "react-user-avatar";
import moment from "moment";

import { DashboardLayout } from "components/layouts";
import { TableBuilder } from "components/tables";
import { ResidentCertificatesService } from "lib/services";

const redidentCertificatesService = new ResidentCertificatesService();

const ResidentCertificatesPage = () => {
  const router = useRouter();
  const searchInputRef = React.useState(null);

  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getResidentCertificates = async (search) => {
    setLoading(true);

    const { data } = await redidentCertificatesService.getAll(search);

    setData(data);
    setLoading(false);
  };

  const handleSearch = (search) => {
    setSearch(search);
  };

  const handleViewCertificate = (certificateFileDirectoryURL) => {
    window.open(certificateFileDirectoryURL);
  };

  const handlePrintCertificate = (certificate) => {
    //
  };

  const formatCertificateCreationDate = (date) => {
    return moment(date).format("MMM DD, YYYY");
  };

  React.useEffect(() => {
    searchInputRef.current.focus();
    getResidentCertificates("");
  }, []);

  React.useEffect(() => {
    if (search !== "") {
      getResidentCertificates(search);
    }
  }, [search]);

  const tableColumns = React.useMemo(
    () => [
      {
        name: "Resident",
        grow: 1.5,
        selector: (row) => row.first_name,
        sortable: true,
        cell: (row) => (
          <Container fluid className="d-flex align-items-center">
            <UserAvatar
              size={48}
              name={`${row.resident_record.first_name} ${row.resident_record.last_name}`}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="pl-3">
              <p className="mb-0">
                {row.resident_record.first_name}{" "}
                {row.resident_record.middle_name}{" "}
                {row.resident_record.last_name}
              </p>

              <small className="text-muted">{row.email}</small>
            </div>
          </Container>
        ),
      },
      {
        name: "Certificate Type",
        selector: (row) => row.type,
        sortable: true,
      },
      {
        name: "Date Created",
        selector: (row) => row.created_at,
        sortable: true,
        cell: (row) => formatCertificateCreationDate(row.create_at),
      },
      {
        name: "Actions",
        selector: (row) => row.id,
        sortable: true,
        cell: (row) => (
          <ButtonGroup>
            <Button
              variant="info"
              className="btn-edit"
              onClick={() => handleViewCertificate(row.file_directory)}
            >
              View
            </Button>
            {/* <Button
              variant="danger"
              className="btn-delete"
              onClick={() => handlePrintCertificate(row)}
            >
              Print
            </Button> */}
          </ButtonGroup>
        ),
      },
    ],
    []
  );

  return (
    <DashboardLayout title="Resident Certificates">
      <Container fluid className="datatable-header">
        <div>
          <Button
            variant="tertiary"
            onClick={() => router.push("/resident-certificates/new")}
          >
            Create New Certificate
          </Button>
        </div>

        <div className="col-sm-6 col-md-4 d-flex">
          <Form.Control
            type="text"
            placeholder="Search"
            className="shadow-sm"
            ref={searchInputRef}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </Container>

      <Card className="card-datatable">
        <Card.Body>
          <TableBuilder columns={tableColumns} data={data} loading={loading} />
        </Card.Body>
      </Card>
    </DashboardLayout>
  );
};

export default ResidentCertificatesPage;
