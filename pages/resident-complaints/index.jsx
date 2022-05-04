import React from "react";
import { useRouter } from "next/router";
import { Container, Button, Card, Form, Badge } from "react-bootstrap";
import UserAvatar from "react-user-avatar";
import moment from "moment";

import { DashboardLayout } from "components/layouts";
import { TableBuilder } from "components/tables";
import { ResidentComplaintsService } from "lib/services";

const residentComplaintService = new ResidentComplaintsService();

const ResidentComplaintsPage = () => {
  const router = useRouter();
  const searchInputRef = React.useState(null);

  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getResidentComplaints = async (search) => {
    setLoading(true);

    const { data } = await residentComplaintService.getAll(search);

    setData(data);
    setLoading(false);
  };

  const handleSearch = (search) => {
    setSearch(search);
  };

  const handleViewEvidence = (evidenceURL) => {
    window.open(evidenceURL);
  };

  const formatEventDate = (date) => {
    return moment(date).format("MMMM D, YYYY");
  };

  React.useEffect(() => {
    searchInputRef.current.focus();
    getResidentComplaints("");
  }, []);

  React.useEffect(() => {
    if (search !== "") {
      getResidentComplaints(search);
    }
  }, [search]);

  const tableColumns = React.useMemo(
    () => [
      {
        name: "Resident",
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
        name: "Details",
        selector: (row) => row.details,
        grow: 3,
        sortable: true,
      },
      {
        name: "Type",
        selector: (row) => row.type,
        sortable: true,
        cell: (row) => <Badge bg="warning">{row.type}</Badge>,
      },

      {
        name: "Date of Event",
        selector: (row) => row.date_of_event,
        sortable: true,
        cell: (row) => formatEventDate(row.date_of_event),
      },
      {
        name: "Actions",
        selector: (row) => row.evidence_file_directory,
        sortable: true,
        cell: (row) => {
          if (row.evidence_file_directory) {
            return (
              <Button
                className="btn-edit"
                onClick={() => handleViewEvidence(row.evidence_file_directory)}
              >
                View Evidence
              </Button>
            );
          }

          return <>&mdash;</>;
        },
      },
    ],
    []
  );

  return (
    <DashboardLayout title="Resident Complaints">
      <Container fluid className="datatable-header">
        <div>
          <Button
            variant="tertiary"
            onClick={() => router.push("/resident-complaints/new")}
          >
            Create New Complaint
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

export default ResidentComplaintsPage;
