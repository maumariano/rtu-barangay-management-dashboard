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

export const ResidentRecordForm = (props) => {
  const { resident, type, formFns } = props;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [submitted, setSubmitted] = React.useState(false);

  const handleFormSubmit = async (values) => {
    setSubmitted(true);

    await formFns.submitFormFn(values);

    setSubmitted(false);
  };

  return (
    <Container>
      <div className="mb-4">
        <small className="text-sm text-muted">General Information</small>
      </div>

      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Row>
          <Col sm={12} md={4}>
            <Form.Group className="form-group">
              <FloatingLabel label="First Name">
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  defaultValue={resident?.first_name || ""}
                  className={
                    Boolean(errors && errors.first_name?.type === "required")
                      ? "border border-danger"
                      : ""
                  }
                  {...register("first_name", { ...requiredValidation })}
                />
              </FloatingLabel>

              {Boolean(errors && errors.first_name?.type === "required") && (
                <small className="text-danger">This field is required</small>
              )}
            </Form.Group>
          </Col>

          <Col sm={12} md={4}>
            <Form.Group className="form-group">
              <FloatingLabel label="Middle Name (Optional)">
                <Form.Control
                  type="text"
                  defaultValue={resident?.middle_name || ""}
                  placeholder="Middle Name (Optional)"
                />
              </FloatingLabel>
            </Form.Group>
          </Col>

          <Col sm={12} md={4}>
            <Form.Group className="form-group">
              <FloatingLabel label="Last Name">
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  defaultValue={resident?.last_name || ""}
                  className={
                    Boolean(errors && errors.last_name?.type === "required")
                      ? "border border-danger"
                      : ""
                  }
                  {...register("last_name", { ...requiredValidation })}
                />
              </FloatingLabel>

              {Boolean(errors && errors.last_name?.type === "required") && (
                <small className="text-danger">This field is required</small>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="form-group">
          <FloatingLabel label="E-mail">
            <Form.Control
              type="text"
              placeholder="E-mail"
              defaultValue={resident?.email || ""}
              className={
                Boolean(errors && errors.email?.type === "required")
                  ? "border border-danger"
                  : ""
              }
              {...register("email", { ...requiredValidation })}
            />
          </FloatingLabel>

          {Boolean(errors && errors.email?.type === "required") && (
            <small className="text-danger">This field is required</small>
          )}
        </Form.Group>

        <Row>
          <Col sm={12} md={6}>
            <Form.Group className="form-group">
              <FloatingLabel label="Mobile Number">
                <Form.Control
                  type="number"
                  placeholder="Mobile Number"
                  defaultValue={resident?.mobile_number || ""}
                  className={
                    Boolean(errors && errors.mobile_number?.type === "required")
                      ? "border border-danger"
                      : ""
                  }
                  {...register("mobile_number", { ...requiredValidation })}
                  onKeyDown={(e) => e.key === "e" && e.preventDefault()}
                />
              </FloatingLabel>

              {Boolean(errors && errors.mobile_number?.type === "required") && (
                <small className="text-danger">This field is required</small>
              )}
            </Form.Group>
          </Col>

          <Col sm={12} md={6}>
            <Form.Group className="form-group">
              <FloatingLabel label="Landline Number">
                <Form.Control
                  type="number"
                  placeholder="Landline Number"
                  defaultValue={resident?.landline || ""}
                  //className={
                    //Boolean(errors && errors.landline?.type === "required")
                      //? "border border-danger"
                      //: ""
                  //}
                  //{...register("landline", { ...requiredValidation })}
                  //onKeyDown={(e) => e.key === "e" && e.preventDefault()}
                />
              </FloatingLabel>

              {/*Boolean(errors && errors.landline?.type === "required") && (
                <small className="text-danger">This field is required</small>
              )*/}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="form-group">
          <FloatingLabel label="Birthdate">
            <Form.Control
              type="date"
              placeholder="Birthdate"
              defaultValue={resident?.birthdate || ""}
              className={
                Boolean(errors && errors.birthdate?.type === "required")
                  ? "border border-danger"
                  : ""
              }
              {...register("birthdate", { ...requiredValidation })}
            />
          </FloatingLabel>

          {Boolean(errors && errors.birthdate?.type === "required") && (
            <small className="text-danger">This field is required</small>
          )}
        </Form.Group>

        <Form.Group className="form-group">
          <FloatingLabel label="Address Line 1">
            <Form.Control
              type="text"
              as="textarea"
              placeholder="Address Line 1"
              defaultValue={resident?.address_line1 || ""}
              className={
                Boolean(errors && errors.address_line1?.type === "required")
                  ? "border border-danger"
                  : ""
              }
              {...register("address_line1", { ...requiredValidation })}
              style={{ height: "90px" }}
            />
          </FloatingLabel>

          {Boolean(errors && errors.email?.type === "required") && (
            <small className="text-danger">This field is required</small>
          )}
        </Form.Group>

        <Form.Group className="form-group">
          <FloatingLabel label="Address Line 2 (Optional)">
            <Form.Control
              type="text"
              as="textarea"
              defaultValue={resident?.address_line2 || ""}
              placeholder="Address Line 2 (Optional)"
              style={{ height: "90px" }}
              {...register("address_line2")}
            />
          </FloatingLabel>
        </Form.Group>

        <Row>
          <Col sm={12} md={6}>
            <Form.Group className="form-group">
              <FloatingLabel label="City">
                <Form.Select
                  defaultValue="Makati City"
                  {...register("city")}
                  disabled
                >
                  <option value="Makati City">Makati City</option>
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
          </Col>

          <Col sm={12} md={6}>
            <Form.Group className="form-group">
              <FloatingLabel label="Region">
                <Form.Select
                  defaultValue="National Capital Region (NCR)"
                  {...register("region")}
                  disabled
                >
                  <option value="National Capital Region (NCR)">
                    National Capital Region (NCR)
                  </option>
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>

        <Button
          type="submit"
          variant="success"
          className="mt-3"
          disabled={submitted}
        >
          {type !== "edit" ? "ADD" : "UPDATE"} RECORD
        </Button>
      </Form>
    </Container>
  );
};
