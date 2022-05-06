import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import { useForm } from "react-hook-form";

const requiredValidation = { required: true };

export const ResidentComplaintForm = (props) => {
  const { residents, formFns } = props;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [file, setFile] = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);

  const handleFormSubmit = async (values) => {
    //console.log({ values });
    setSubmitted(true);

    let formData = new FormData();
    formData.append("resident_record_id", values.resident_record_id);
    formData.append("type", values.type);
    formData.append("details", values.details);
    formData.append("date_of_event", values.date_of_event);
    formData.append("complainant", values.complainant);
    formData.append("place_of_incident", values.placeOfIncident);

    if (file !== 0) {
      formData.append("evidence_file", file);
    }

    await formFns.submitFormFn(formData);

    setSubmitted(false);
  };

  const handleFileUpload = (file) => {
    setFile(file);
  };

  return (
    <Container>
      <div className="mb-4">
        <small className="text-sm text-muted">Complaint Information</small>
      </div>

      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Form.Group className="form-group">
          <FloatingLabel label="Subject of Complaint">
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
          <FloatingLabel label="Type">
            <Form.Select
              className={
                Boolean(errors && errors.type?.type === "required")
                  ? "border border-danger"
                  : ""
              }
              {...register("type", { ...requiredValidation })}
            >
              <option value="Trespassing">Unlawful use of means of publication and unlawful utterances</option>
              <option value="Alarms and scandals">Alarms and scandals</option>
              <option value="Using false certificates">Using false certificates</option>
              <option value="Harassment">Harassment</option>
              <option value="Using fictitious names and concealing true names">Using fictitious names and concealing true names</option>
              <option value="Less serious physical injuries">Less serious physical injuries</option>
              <option value="Slight physical injuries and maltreatment">Slight physical injuries and maltreatment</option>
              <option value="Unlawful arrest">Unlawful arrest</option>
              <option value="Qualified trespass to dwelling (without the use of violence and intimidation)">Qualified trespass to dwelling (without the use of violence and intimidation)</option>
              <option value="Theft (if the value of the property stolen does not exceed P50.00)">Theft (if the value of the property stolen does not exceed P50.00)</option>
              <option value="Qualified theft">Qualified theft</option>
              <option value="Occupation of real property or usurpation of real rights in property">Occupation of real property or usurpation of real rights in property</option>
              <option value="Altering boundaries or landmarks">Altering boundaries or landmarks</option>
              <option value="Incriminating innocent persons">Incriminating innocent persons</option>
              <option value="Intriguing against honor">Intriguing against honor</option>
              <option value="Issuing checks without sufficient funds">Issuing checks without sufficient funds</option>
              <option value="Swindling or estafa">Swindling or estafa</option>
            </Form.Select>
          </FloatingLabel>

          {Boolean(errors && errors.type?.type === "required") && (
            <small className="text-danger">This field is required</small>
          )}
        </Form.Group>

        <Form.Group className="form-group">
          <FloatingLabel label="Details">
            <Form.Control
              type="text"
              as="textarea"
              placeholder="Details"
              style={{ height: "100px" }}
              className={
                Boolean(errors && errors.details?.type === "required")
                  ? "border border-danger"
                  : ""
              }
              {...register("details", { ...requiredValidation })}
            />
          </FloatingLabel>

          {Boolean(errors && errors.details?.type === "required") && (
            <small className="text-danger">This field is required</small>
          )}
        </Form.Group>

        <Form.Group className="form-group">
          <FloatingLabel label="Date of Event">
            <Form.Control
              type="date"
              placeholder="Date of Event"
              className={
                Boolean(errors && errors.date_of_event?.type === "required")
                  ? "border border-danger"
                  : ""
              }
              {...register("date_of_event", { ...requiredValidation })}
            />
          </FloatingLabel>

          {Boolean(errors && errors.date_of_event?.type === "required") && (
            <small className="text-danger">This field is required</small>
          )}
        </Form.Group>

        <Row>
          <Col sm={12} md={6}>
          <Form.Group className="form-group">
              <FloatingLabel label="Complainant">
                <Form.Control
                  type="text"
                  placeholder="Complainant"
                  defaultValue={""}
                  className={
                    Boolean(errors && errors.complainant?.type === "required")
                      ? "border border-danger"
                      : ""
                  }
                  {...register("complainant", { ...requiredValidation })}
                />
              </FloatingLabel>

              {Boolean(errors && errors.complainant?.type === "required") && (
                <small className="text-danger">This field is required</small>
              )}
            </Form.Group>
          </Col>

          <Col sm={12} md={6}>
            <Form.Group className="form-group">
              <FloatingLabel label="Place of Incident">
                <Form.Control
                  type="text"
                  placeholder="Place of Incident"
                  defaultValue={""}
                  className={
                    Boolean(errors && errors.place_of_incident?.type === "required")
                      ? "border border-danger"
                      : ""
                  }
                  {...register("place_of_incident", { ...requiredValidation })}
                />
              </FloatingLabel>

              {Boolean(errors && errors.place_of_incident?.type === "required") && (
                <small className="text-danger">This field is required</small>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="form-group">
          <FloatingLabel label="Evidence File">
            <Form.Control
              type="file"
              onChange={(e) => handleFileUpload(e.target.files[0])}
            />
          </FloatingLabel>

          <small className="text-muted">
            &mdash; Only provide evidence if there`s any
          </small>
        </Form.Group>

        <Button
          type="submit"
          variant="success"
          className="mt-3"
          disabled={submitted}
        >
          CREATE COMPLAINT
        </Button>
      </Form>
    </Container>
  );
};
