import React from "react";
import { useRouter } from "next/router";
import { redirectWithDelay } from "lib/helpers";
import emailjs from 'emailjs-com';
import Swal from "sweetalert2";
import {
  Container,
  ButtonGroup,
  Button,
  Modal,
  Card,
  Form,
  Badge,
} from "react-bootstrap";
import UserAvatar from "react-user-avatar";
import moment from "moment";

import { DashboardLayout } from "components/layouts";
import { TableBuilder } from "components/tables";
import { BrgyCertificatesService } from "lib/services";
import { func } from "prop-types";
import { fn } from "moment";

const brgyCertificatesService = new BrgyCertificatesService();

const ResidentCertificatesPage = () => {
  const router = useRouter();
  // const searchInputRef = React.useState(null);

  const [showModal, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [residentRecord, setResidentRecord] = React.useState([]);

  // React.useEffect(() => {
  //   const fetchResident = async () => {
  //     await fetch("http://localhost:8000/api/v1/resident-records")
  //     .then((res) => res.json())
  //     .then((residentRecord) => {
  //       setResidentRecord(residentRecord);
  //       console.log(residentRecord);
  //     });
  //   }
  //   fetchResident();
  // }, []);

  const getResidentCertificates = async (search) => {
    setLoading(true);

    const { data } = await brgyCertificatesService.getAll();

    setData(data);
    setLoading(false);
  };

  // const filteredItems = data.filter(item == "Pamela");

  // const handleSearch = (search) => {
  //   setSearch(search);
  // };

  const handleViewCertificate = (certificateFileDirectoryURL) => {
    window.open(certificateFileDirectoryURL);
  };

  const handlePrintCertificate = (certificate) => {
    //
  };

  const formatCertificateCreationDate = (date) => {
    return moment(date).format("MMM DD, YYYY");
  };

//   React.useEffect(() => {
//     searchInputRef.current.focus();
//     getResidentCertificates("");
//   }, []);

  React.useEffect(() => {
    // if (search !== "") {
      getResidentCertificates();
    // }
  }, []);

  function filterCert(rows) {
    return rows.filter(
      row => row.doc_type.indexOf("brgy_cert") > -1
      );
  }

  function filterClearance(rows) {
    return rows.filter(
      row => row.doc_type.indexOf("brgy_clearance") > -1
      );
  }

  function filterIndigency(rows) {
    return rows.filter(
      row => row.doc_type.indexOf("indigency") > -1
      );
  }

  function filterPermit(rows) {
    return rows.filter(
      row => row.doc_type.indexOf("permit") > -1
      );
  }

  function filterSPC(rows) {
    return rows.filter(
      row => row.doc_type.indexOf("spc") > -1
      );
  }

  function sendEmail(email, firstName) {
    // console.log(email);
    emailjs.send("service_se1yaiq","template_61oxisj",{
      to_email: email,
      to_name: firstName
    }, "tJuDxCT8n006uPjTX");
    console.log(email, firstName);

    // var templateParams = {
    //   name: firstName,
    //   to_email: email
    // };
   
    // emailjs.send('service_se1yaiq', 'template_61oxisj', templateParams)
    //     .then(function(response) {
    //       console.log('SUCCESS!', response.status, response.text);
    //     }, function(error) {
    //       console.log('FAILED...', error);
    //     });
    }

  function sendEmailNotFound(email, firstName) {
    // console.log(email);
    emailjs.send("service_se1yaiq","template_jyy9jec",{
      to_email: email,
      to_name: firstName
    }, "tJuDxCT8n006uPjTX");
    console.log(email, firstName);
    console.log(email, firstName)

    // var templateParams = {
    //   name: firstName,
    //   to_email: email
    // };
    
    // emailjs.send('service_se1yaiq', 'template_61oxisj', templateParams)
    //     .then(function(response) {
    //       console.log('SUCCESS!', response.status, response.text);
    //     }, function(error) {
    //       console.log('FAILED...', error);
    //     });
    }  

  function lookUp(rows, fName, residentEmail) {

    const fetchResident = async () => {
      await fetch("http://localhost:8000/api/v1/resident-records")
      .then((res) => res.json())
      .then((residentRecord) => {
        setResidentRecord(residentRecord);
        console.log(residentRecord, fName);
        for(let index = 0; index < residentRecord.length; ++index) {
          // var res = residentRecord[index];
    
          if(fName == residentRecord[index].first_name) {
            Swal.fire({
                  icon: "success",
                  title: "Record found",
                  text: fName,
                  cancelButtonText: "Cancel",
                  showCancelButton: true,
                  confirmButtonText: "Accept Request",
                  html: 
                  "<style>" +
                  "table, th, td {" +
                    "border: 1px solid black;" +
                    "}" +
                  "</style>" +
                  "<table style='width: 100%'>" +
                    "<tr> " +
                      "<th>Name</th> " + 
                      "<th>Email</th> " + 
                      "<th>Address</th> " + 
                    "</tr> " +
                    "<tr> " +
                      "<td>" + residentRecord[index].first_name + " " + residentRecord[index].last_name + "</td> " +
                      "<td>" + residentRecord[index].email + "</td> " +
                      "<td>" + residentRecord[index].address_line1 + "</td> " +
                    "</tr> " +
                  "</table>"
                }).then((result) => {
                  if(result.isConfirmed) {
                    sendEmail(residentEmail, residentRecord[index].first_name);
                  }
                });
                break;
          } else if(fName != residentRecord[index].first_name) {
            Swal.fire({
              icon: "error",
              title: "Record not found",
              text: fName,
              confirmButtonText: "Send Email",
              // html: "<h1>ASD</h1>"
            }).then((result) => {
              if(result.isConfirmed) {
                sendEmailNotFound(residentEmail, fName);
                console.log(residentEmail, fName);
              }
            });
          }
        }
      });
    }
    fetchResident();
  }

  const tableColumns = React.useMemo(
    () => [
      {
        name: "Name",
        grow: 1.5,
        selector: (row) => row.first_name,
        sortable: true,
        cell: (row) => (
          <Container fluid className="d-flex align-items-center">
            <UserAvatar
              size={48}
              name={`${row.first_name} ${row.last_name}`}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="pl-3">
              <p className="mb-0">
                {row.first_name}{" "}
                {row.middle_name}{" "}
                {row.last_name}
              </p>

              <small className="text-muted">{row.email}</small>
            </div>
          </Container>
        ),
      },
      {
        name: "Request Date",
        selector: (row) => row.created_at,
        sortable: true,
        cell: (row) => formatCertificateCreationDate(row.create_at)
      },
      {
        name: "Purpose",
        selector: (row) => row.purpose,
        sortable: true,
      },
      {
        name: "Actions",
        selector: (row) => row.id,
        sortable: true,
        cell: (row) => (
          <ButtonGroup>
            <Button
              variant="info"
              className="openModalBtn btn-edit"
              onClick={() => lookUp(data, row.first_name, row.email)}
            >
              Check
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
    
    <DashboardLayout title="Resident Certificates Requests">
      <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: "green"}}>Record found!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{handleClose}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleClose}>
            Accept Request
          </Button>
          <Button variant="info" onClick={handleClose}>
            Print
          </Button>
        </Modal.Footer>
      </Modal>
      </>
        {/* { JSON.stringify(data).filter() } */}
      <Container fluid className="datatable-header">
        {/* <div>
          <Button
            variant="primary"
            onClick={() => router.push("/resident-certificates-requests/new")}
          >
            Create New Certificate
          </Button>
        </div> */}

        {/* <div className="col-sm-6 col-md-4 d-flex">
          <Form.Control
            type="text"
            placeholder="Search"
            className="shadow-sm"
            // ref={searchInputRef}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div> */}
      </Container>

      <h3>Barangay Certificate</h3>
      <Card className="card-datatable">
        <Card.Body>
          <TableBuilder columns={tableColumns} data={filterCert(data)} loading={loading} />
        </Card.Body>
      </Card>
      <br></br>
      <h3>Barangay Clearance</h3>
      <Card className="card-datatable">
        <Card.Body>
          <TableBuilder columns={tableColumns} data={filterClearance(data)} loading={loading} />
        </Card.Body>
      </Card>
      <br></br>
      <h3>Certificate of Indigency</h3>
      <Card className="card-datatable">
        <Card.Body>
          <TableBuilder columns={tableColumns} data={filterIndigency(data)} loading={loading} />
        </Card.Body>
      </Card>
      <br></br>
      <h3>Permit for Telecommunication</h3>
      <Card className="card-datatable">
        <Card.Body>
          <TableBuilder columns={tableColumns} data={filterPermit(data)} loading={loading} />
        </Card.Body>
      </Card>
      <br></br>
      <h3>Solo Parent Certification</h3>
      <Card className="card-datatable">
        <Card.Body>
          <TableBuilder columns={tableColumns} data={filterSPC(data)} loading={loading} />
        </Card.Body>
      </Card>
    </DashboardLayout>
  );
};

export default ResidentCertificatesPage;
