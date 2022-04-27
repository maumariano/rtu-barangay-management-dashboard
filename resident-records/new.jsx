import React from "react";
import { Container, Card } from "react-bootstrap";

import { DashboardLayout } from "components/layouts";
import { ResidentRecordForm } from "components/forms";

import { ResidentRecordsService } from "lib/services";

const residentRecordsService = new ResidentRecordsService();

const ResidentRecordNewPage = () => {
  const handleRegisterResident = async (resident) => {
    await residentRecordsService.registerResident(resident);
  };

  return (
    <DashboardLayout title="New Resident Record">
      <Container fluid>
        <Card className="col-md-12">
          <Card.Body>
            <ResidentRecordForm
              formFns={{ submitFormFn: handleRegisterResident }}
            />
          </Card.Body>
        </Card>
      </Container>
    </DashboardLayout>
  );
};

export default ResidentRecordNewPage;
