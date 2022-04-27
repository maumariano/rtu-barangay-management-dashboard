import React from "react";
import { Container, Card } from "react-bootstrap";

import { DashboardLayout } from "components/layouts";
import { ResidentCertificateForm } from "components/forms";

import {
  ResidentRecordsService,
  ResidentCertificatesService,
} from "lib/services";

const residentsRecordsService = new ResidentRecordsService();
const redidentCertificatesService = new ResidentCertificatesService();

const ResidentCertificateNewPage = () => {
  const [residents, setResidents] = React.useState([]);

  const handleCreateCertificate = async (certificate) => {
    console.log(certificate);
    await redidentCertificatesService.createCertificate(certificate);
  };

  const getResidents = async () => {
    const { data } = await residentsRecordsService.getAll("");

    setResidents(data);
  };

  React.useEffect(() => {
    getResidents();
  }, []);

  return (
    <DashboardLayout title="New Resident Certificate">
      <Container fluid>
        <Card className="col-md-12 mb-3">
          <Card.Body>
            <ResidentCertificateForm
              residents={residents}
              formFns={{ submitFormFn: handleCreateCertificate }}
            />
          </Card.Body>
        </Card>
      </Container>
    </DashboardLayout>
  );
};

export default ResidentCertificateNewPage;
