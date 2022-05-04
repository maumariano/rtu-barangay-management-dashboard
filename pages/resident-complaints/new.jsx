import React from "react";
import { Container, Card } from "react-bootstrap";

import { DashboardLayout } from "components/layouts";
import { ResidentComplaintForm } from "components/forms";
import {
  ResidentRecordsService,
  ResidentComplaintsService,
} from "lib/services";

const residentRecordsService = new ResidentRecordsService();
const residentComplaintService = new ResidentComplaintsService();

const ResidentNewComplaintPage = () => {
  const [residents, setResidents] = React.useState([]);

  const handleCreateComplaint = async (complaint) => {
    // console.log(complaint);
    await residentComplaintService.createComplaint(complaint);
  };

  const getResidents = async () => {
    const { data } = await residentRecordsService.getAll("");

    setResidents(data);
  };

  React.useEffect(() => {
    getResidents();
  }, []);

  return (
    <DashboardLayout title="New Resident Complaint">
      <Container fluid>
        <Card className="col-md-12 mb-3">
          <Card.Body>
            <ResidentComplaintForm
              residents={residents}
              formFns={{ submitFormFn: handleCreateComplaint }}
            />
          </Card.Body>
        </Card>
      </Container>
    </DashboardLayout>
  );
};

export default ResidentNewComplaintPage;
