import React from "react";
import { Container, Form, FloatingLabel, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FiCornerRightUp } from "react-icons/fi";
import Pdf from "react-to-pdf";

import { BaseCertificateTemplate } from "components/certificate-templates";

const requiredValidation = { required: true };

export const ResidentCertificateForm = (props) => {
  const { residents, formFns } = props;
  const certificateTemplateRef = React.useRef(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [selectedResident, setSelectedResident] = React.useState("");
  const [selectedCertificateType, setSelectedCertificateType] =
    React.useState("");
  const [certificateFilename, setCertificateFilename] = React.useState("");
  const [certificateFile, setCertificateFile] = React.useState(null);
  const [purpose, setPurpose] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    generateFilename(selectedResident, selectedCertificateType);
  }, [selectedResident, selectedCertificateType]);

  const handleFormSubmit = async (values) => {
    // setSubmitted(true);
    values.certificate_pdf_file = values.certificate_pdf_file[0];

    let formData = new FormData();
    for (let d in values) {
      formData.append(d, values[d]);
    }

    await formFns.submitFormFn(formData);

    setSubmitted(false);
  };

  const generateFilename = (resident, certificateType) => {
    const { first_name, last_name } = resident;

    let residentFullname = `${first_name}-${last_name}`.toLowerCase();
    setCertificateFilename(`${residentFullname}-${certificateType}.pdf`);
  };

  const setResidentData = (residentId) => {
    let idx = residents.findIndex((r) => r.id === parseInt(residentId));

    setSelectedResident(residents[idx]);
  };

  return (
    <Container>
      <div className="mb-4">
        <small className="text-sm text-muted">Certificate Information</small>
      </div>

      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Form.Group className="form-group">
          <FloatingLabel label="Resident">
            <Form.Select
              type="text"
              placeholder="Resident"
              className={
                Boolean(
                  errors && errors.resident_record_id?.type === "required"
                )
                  ? "border border-danger"
                  : ""
              }
              defaultValue={selectedResident}
              onInput={(e) => setResidentData(e.target.value)}
              {...register("resident_record_id", { ...requiredValidation })}
            >
              <option value="">Choose</option>
              {Boolean(residents.length > 0) &&
                residents.map((_, idx) => (
                  <option key={idx} value={_.id}>
                    {_.first_name} {_.middle_name} {_.last_name}
                  </option>
                ))}
            </Form.Select>
          </FloatingLabel>

          {Boolean(
            errors && errors.resident_record_id?.type === "required"
          ) && <small className="text-danger">This field is required</small>}
        </Form.Group>

        <Form.Group className="form-group">
          <FloatingLabel label="Certificate Type">
            <Form.Select
              type="text"
              placeholder="Certificate Type"
              className={
                Boolean(errors && errors.type?.type === "required")
                  ? "border border-danger"
                  : ""
              }
              onInput={(e) => setSelectedCertificateType(e.target.value)}
              {...register("type", { ...requiredValidation })}
            >
              <option value="">Choose</option>
              <option value="barangay-clearance">Barangay Clearance</option>
              <option value="barangay-certificate">Barangay Certificate</option>
              <option value="indigency-certificate">
                Indigency Certificate
              </option>
              <option value="solo-parent-certificate">
                Solo Parent Certificate
              </option>
              <option value="business-permit-certificate">
                Telecommunication Permit
              </option>
            </Form.Select>
          </FloatingLabel>

          {Boolean(errors && errors.email?.type === "required") && (
            <small className="text-danger">This field is required</small>
          )}
        </Form.Group>

        <Form.Group className="form-group">
          <FloatingLabel label="Purpose">
            <Form.Control
              type="text"
              as="textarea"
              style={{ height: "100px" }}
              className={
                Boolean(errors && errors.purpose?.type === "required")
                  ? "border border-danger"
                  : ""
              }
              onInput={(e) => setPurpose(e.target.value)}
              {...register("purpose", { ...requiredValidation })}
            />
          </FloatingLabel>

          {Boolean(errors && errors.purpose?.type === "required") && (
            <small className="text-danger">This field is required</small>
          )}
        </Form.Group>

        <Form.Group className="form-group">
          <FloatingLabel label="Certificate File">
            <Form.Control
              type="file"
              className={
                Boolean(
                  errors && errors.certificate_pdf_file?.type === "required"
                )
                  ? "border border-danger"
                  : ""
              }
              {...register("certificate_pdf_file", { ...requiredValidation })}
            />
          </FloatingLabel>

          {Boolean(
            errors && errors.certificate_pdf_file?.type === "required"
          ) && <small className="text-danger">This field is required</small>}

          <p className="text-underline mt-2" style={{ fontSize: "13px" }}>
            <span className="text-danger">IMPORTANT</span> &mdash; Download the
            generated certificate below and upload the file to here
            <FiCornerRightUp />
          </p>
        </Form.Group>

        <Button
          type="submit"
          variant="success"
          className="mt-3"
          disabled={submitted}
        >
          SAVE CERTIFICATE TO DATABASE
        </Button>

        <hr />

        <div className="my-2">
          <small className="text-sm text-muted">Certificate Preview</small>

          <div>
            <Pdf
              targetRef={certificateTemplateRef}
              filename={certificateFilename}
            >
              {({ toPdf }) => (
                <Button
                  onClick={toPdf}
                  variant="info"
                  className="p-2"
                  disabled={Boolean(
                    selectedResident === "" ||
                      selectedCertificateType === "" ||
                      purpose === ""
                  )}
                >
                  Download Certificate
                </Button>
              )}
            </Pdf>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div ref={certificateTemplateRef} style={{ width: "65%", height: "1125px"}}>
            <BaseCertificateTemplate
              resident={selectedResident}
              type={selectedCertificateType}
              purpose={purpose}
            />
          </div>
        </div>
      </Form>
    </Container>
  );
};
