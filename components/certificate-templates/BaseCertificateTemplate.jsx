import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import moment from "moment";

export const BaseCertificateTemplate = (props) => {
  const { resident, type, purpose } = props;

  const [currentDate] = React.useState(moment().format("MMMM D, YYYY"));

  const getComputeResidentAge = (residentBirthdate) => {
    return new Date().getFullYear() - new Date(residentBirthdate).getFullYear();
  };

  const barangayCertificateContent = (type, resident) => {
    const { first_name, last_name, birthdate, address_line1 } = resident;

    let residentFullname = `${first_name} ${last_name}`;
    let residentAge = getComputeResidentAge(birthdate);

    switch (type) {
      case "barangay-certificate":
        return (
          <p>
            This is to certify that {residentFullname}, {residentAge} years old,
            is a bona fide resident of Barangay Pitogo with postal address at { }
            {address_line1}.
            <br />
            <br />
            This certification is being issued upon the request of the above
            mentioned person for {purpose}.
            <br />
            <br />
            Issued on
            {" "}{currentDate} at the Barangay Pitogo, Makati City.
          </p>
        );

      case "barangay-clearance":
        return (
          <p>
            This is to certifies that the {residentFullname}, {residentAge}{" "}
            years of age, Filipino, whose signature and thumb marks appear
            hereunder, is a bona fide resident of this Barangay, with postal
            address at {address_line1} Barangay Pitogo, Makati City.
            <br />
            <br />
            This issued upon the request of the above name person this
            {" "}{currentDate} at the for the purpose of{" "}
            {purpose}.
          </p>
        );

      case "indigency-certificate":
        return (
          <p>
            This is to certify that {residentFullname} , {residentAge} years
            old, is a bona fide resident of Barangay Pitogo with postal address
            at {address_line1}.
            <br />
            <br />
            Further certify that {residentFullname} is belong to the indigent
            families of Barangay Pitogo This certificate is being issued upon
            the request of the above mentioned person for {purpose}.
            <br />
            <br />
            Issued on {currentDate} at the Barangay Pitogo, Makati City.
          </p>
        );

      case "solo-parent-certificate":
        return (
          <p>
            This is to certify that {residentFullname} , {residentAge} years
            old, is a bona fide resident of Barangay Pitogo with postal address
            at {address_line1}.
            <br />
            <br />
            Further certify that {residentFullname} is a solo parent to
            (his/her) child living in the same postal / residential address.{" "}
            <br />
            <br />
            This certification is being issued upon the request of the above
            mentioned person for {purpose}. Issued on
            {currentDate} at the Barangay Pitogo, Makati City.
          </p>
        );

      case "business-permit-certificate":
        return (
          <p>
            The Sangguniang Barangay of Pitogo, Makati City, without any
            objection, hereby grants this PERMIT to (Company) to conduct
            internet installation at {address_line1} . It is understood that
            restoration of damaged infrastructure, both public or private, if
            there is any, shall be for the account of the provider concerned.
            Issued on {currentDate} at the Barangay Pitogo, Makati City. Valid
            until (Preferred Date) only.
          </p>
        );

      case "telecommunation-permit-certificate":
        return (
          <p>
            The Sangguniang Barangay of Pitogo, Makati City, without any
            objection, hereby grants this PERMIT to conduct
            internet installation at {address_line1} . It is understood that
            restoration of damaged infrastructure, both public or private, if
            there is any, shall be for the account of the provider concerned.
            Issued on {currentDate} at the Barangay Pitogo, Makati City. 
          </p>
        );

      default:
        return <p>Invalid template</p>;
    }
  };

  return (
    <Container fluid className="certificate-container">
      <Row>
        <Col md={4}>
          <div className="col-7 mx-auto">
            <Image
              src="/assets/images/pitogo-seal.png"
              fluid
              alt="Pitogo Seal Logo"
            />
          </div>
        </Col>

        <Col md={4} className="certificate-header-texts text-center">
          <p>REPUBLIC OF THE PHILIPPINES</p>
          <p>BARANGAY (23) PITOGO</p>
          <p>CITY OF MAKATI</p>
          <p>OFFICE OF THE BARANGAY COUNCIL</p>
        </Col>

        <Col md={4}>
          <div className="col-7 mx-auto">
            <Image
              src="/assets/images/makati-logo.png"
              fluid
              alt="Makati City Logo"
            />
          </div>
        </Col>
      </Row>

      <Container fluid className="certificate-content-container col-10">
        <h5 className="fw-bold text-center text-capitalize mb-5">
          {type.replace("-", " ") || "CERTIFICATE"}
        </h5>

        <p>To Whom It May Concern</p>

        <p className="text-center">
          {Boolean(!resident) && "[CHOOSE A RESIDENT]"}
        </p>

        {Boolean(resident) && barangayCertificateContent(type, resident)}

        <br />
        <br />
        <div className="col-sm-3 offset-sm-9 mt-4">
          <div
            className="text-center pt-2"
            style={{ borderTop: "solid 1px #262626" }}
          >
            <p className="fw-bold mb-0">Ives M. Ebrada</p>
            <small>Punong Barangay</small>
          </div>
        </div>
      </Container>
     
      <div className="barangay-address" >
        <small>
        502 Cebu Street, Pitogo, Makati City*Tel. No’s:8313375/8825288*Email
          add: barangay23pitogo@gmail.com 
        </small>
      </div>
    </Container>
  );
};
