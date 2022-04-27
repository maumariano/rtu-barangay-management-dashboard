import React from "react";
import { useRouter } from "next/router";
import { Card, ButtonGroup, Button, Badge } from "react-bootstrap";
import moment from "moment";

import { DashboardLayout } from "components/layouts";
import { ResidentRecordForm } from "components/forms";
import { TableBuilder } from "components/tables";
import { ResidentRecordsService } from "lib/services";

const residentRecordsService = new ResidentRecordsService();

const ResidentProfilePage = () => {
  const router = useRouter();
  const residentId = router.query.resident_id;

  const [resident, setResident] = React.useState(null);

  const formatCertificateCreationDate = (date) => {
    return moment(date).format("MMM DD, YYYY");
  };

  const handleViewCertificate = (certificateFileDirectoryURL) => {
    window.open(certificateFileDirectoryURL);
  };

  const residentCertificatesTableColumn = React.useMemo(
    () => [
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
          </ButtonGroup>
        ),
      },
    ],
    []
  );

  const formatEventDate = (date) => {
    return moment(date).format("MMMM D, YYYY");
  };

  const handleViewEvidence = (evidenceURL) => {
    window.open(evidenceURL);
  };

  const residentComplaintsTableColumns = React.useMemo(
    () => [
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

  const getResidentProfile = async (residentId) => {
    const { data } = await residentRecordsService.getResidentRecordById(
      residentId
    );

    setResident(data);
  };

  const handleUpdateResidentRecord = async (resident) => {
    const { data } = await residentRecordsService.updateResidentRecordById(
      residentId,
      resident
    );

    await getResidentProfile(residentId);
  };

  const handleDeleteResidentRecord = async () => {
    if (confirm("Are you sure you want to delete this resident record?")) {
      await residentRecordsService.deleteResidentRecordById(residentId);
    }
  };

  React.useEffect(() => {
    if (residentId) {
      getResidentProfile(residentId);
    }
  }, []);

  return (
    <DashboardLayout title="Resident Profile">
      {Boolean(resident === null) && "Fetching profile ..."}

      {Boolean(resident !== null) && (
        <>
          <Button
            variant="danger text-white"
            className="mb-2"
            onClick={handleDeleteResidentRecord}
          >
            Delete Resident Record
          </Button>
          <Card>
            <Card.Body>
              <div className="mb-4">Basic Information</div>

              <ResidentRecordForm
                resident={resident}
                type="edit"
                formFns={{ submitFormFn: handleUpdateResidentRecord }}
              />
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <div className="mb-4">Reported Complaints</div>

              <TableBuilder
                columns={residentComplaintsTableColumns}
                data={resident ? resident.resident_complaints : []}
                loading={Boolean(resident === null)}
              />
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <div className="mb-4">Requested/Issued Certificates</div>

              <TableBuilder
                columns={residentCertificatesTableColumn}
                data={resident ? resident.resident_certificates : []}
                loading={Boolean(resident === null)}
              />
            </Card.Body>
          </Card>
        </>
      )}
    </DashboardLayout>
  );
};

export default ResidentProfilePage;
