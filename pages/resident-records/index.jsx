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

import { DashboardLayout } from "components/layouts";
import { TableBuilder } from "components/tables";
import { ResidentRecordsService } from "lib/services";

const residentRecordsService = new ResidentRecordsService();

const ResidentRecordsPage = () => {
  const router = useRouter();
  const searchInputRef = React.useRef(null);

  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getResidentRecords = async (search) => {
    setLoading(true);

    const { data } = await residentRecordsService.getAll(search);

    setData(data);
    setLoading(false);
  };

  const getResidentAge = (birthdate) => {
    return new Date().getYear() - new Date(birthdate).getYear();
  };

  const handleSearch = async (search) => {
    setSearch(search);
  };

  const handleViewResident = (residentRecordId) => {
    router.push("/resident-records/" + residentRecordId);
  };

  React.useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  React.useEffect(() => {
    getResidentRecords(search);
  }, [search]);

  const tableColumns = React.useMemo(
    () => [
      {
        name: "Resident",
        grow: 2,
        selector: (row) => row.first_name,
        sortable: true,
        cell: (row) => (
          <Container fluid className="d-flex align-items-center">
            <UserAvatar size={48} name={`${row.first_name} ${row.last_name}`} />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="pl-3">
              <p className="mb-0">
                {row.first_name} {row.middle_name} {row.last_name}
              </p>

              <small className="text-muted">{row.email}</small>
            </div>
          </Container>
        ),
      },
      {
        name: "Age",
        selector: (row) => row.name,
        sortable: true,
        cell: (row) => getResidentAge(row.birthdate),
      },
      {
        name: "Has Complaints Reported",
        grow: 1,
        selector: (row) => row.resident_complaints,
        sortable: true,
        cell: (row) =>
          row.resident_complaints.length > 0 ? (
            <Badge bg="danger">Record(s) found</Badge>
          ) : (
            <>&mdash;</>
          ),
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
              onClick={() => handleViewResident(row.id)}
            >
              View Profile
            </Button>
            {/* <Button
              variant="danger"
              className="btn-delete"
              onClick={() => handleDeleteResident(row.id)}
            >
              Remove
            </Button> */}
          </ButtonGroup>
        ),
      },
    ],
    []
  );

  return (
    <DashboardLayout title="Resident Records">
      <Container fluid className="datatable-header">
        <div>
          <Button
            variant="tertiary"
            onClick={() => router.push("/resident-records/new")}
          >
            Add New Entry
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

export default ResidentRecordsPage;
