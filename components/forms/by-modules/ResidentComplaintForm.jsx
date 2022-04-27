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
    setSubmitted(true);

    let formData = new FormData();
    formData.append("resident_record_id", values.resident_record_id);
    formData.append("type", values.type);
    formData.append("details", values.details);
    formData.append("date_of_event", values.date_of_event);

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
              <option value="">Choose</option>
              <option value="Trespassing">Trespassing</option>
              <option value="Noise complaint">Noise complaint</option>
              <option value="Theft ">Theft </option>
              <option value="Harassment">Harassment</option>
              <option value="Others (specify at details)">
                Others (specify in details field)
              </option>
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
