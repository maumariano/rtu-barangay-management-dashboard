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
  } = useForm({
    defaultValues: {
      city: "Makati City",
      region: "National Capital Region (NCR)"
    }
  });

  const [submitted, setSubmitted] = React.useState(false);

  const handleFormSubmit = async (values) => {
    // values.valid_id = values.valid_id[0];
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

        <Row>
          <Col sm={12} md={6}>
            <Form.Group className="form-group">
              <FloatingLabel label="Gender">
                <Form.Select
                  className={
                    Boolean(errors && errors.Gender?.type === "required")
                      ? "border border-danger"
                      : ""
                  }
                  defaultValue={resident?.gender || ""}
                  {...register("gender", { ...requiredValidation })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-Binary</option>
                </Form.Select>
              </FloatingLabel>

              {Boolean(
                errors && errors.resident_record_id?.type === "required"
              ) && <small className="text-danger">This field is required</small>}
            </Form.Group>
          </Col>
          <Col sm={12} md={6}>
            <Form.Group className="form-group">
              <FloatingLabel label="Civil Status">
                <Form.Select
                  defaultValue={resident?.civil_status || ""}
                  className={
                    Boolean(errors && errors.CivilStatus?.type === "required")
                      ? "border border-danger"
                      : ""
                  }
                  {...register("civil_status", { ...requiredValidation })}
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widow/Widower">Widow/Widower</option>
                  <option value="Separated/Annuled">Separated/Annuled</option>
                  <option value="Living with Partner">Living with Partner</option>
                </Form.Select>
              </FloatingLabel>

              {Boolean(
                errors && errors.resident_record_id?.type === "required"
              ) && <small className="text-danger">This field is required</small>}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={6}>
            <Form.Group className="form-group">
              <FloatingLabel label="Citizenship">
                <Form.Control
                  type="text"
                  placeholder="Citizenship"
                  defaultValue={resident?.citizenship || ""}
                  className={
                    Boolean(errors && errors.citizenship?.type === "required")
                      ? "border border-danger"
                      : ""
                  }
                  {...register("citizenship", { ...requiredValidation })}
                />
              </FloatingLabel>

              {Boolean(errors && errors.citizenship?.type === "required") && (
                <small className="text-danger">This field is required</small>
              )}
            </Form.Group>
          </Col>

          <Col sm={12} md={6}>
            <Form.Group className="form-group">
              <FloatingLabel label="Profession">
                <Form.Control
                  type="text"
                  placeholder="Profession"
                  defaultValue={resident?.profession || ""}
                  className={
                    Boolean(errors && errors.profession?.type === "required")
                      ? "border border-danger"
                      : ""
                  }
                  {...register("profession", { ...requiredValidation })}
                />
              </FloatingLabel>

              {Boolean(errors && errors.profession?.type === "required") && (
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
                  <option value="Makati City" selected>Makati City</option>
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
          </Col>

          <Col sm={12} md={6}>
            <Form.Group className="form-group">
              <FloatingLabel label="Region">
                <Form.Select
                  defaultValue="National Capital Region (NCR)"
                  value="National Capital Region (NCR)"
                  {...register("region")}
                  disabled
                >
                  <option value="National Capital Region (NCR)" selected>
                    National Capital Region (NCR)
                  </option>
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={6}>
          <Form.Group className="form-group">
              <FloatingLabel label="Category ID">
                <Form.Select
                  defaultValue={resident?.category_id || ""}
                  className={
                    Boolean(errors && errors.CategoryID?.type === "required")
                      ? "border border-danger"
                      : ""
                  }
                  {...register("category_id", { ...requiredValidation })}
                >
                  <option value="e-Card / UMID">e-Card / UMID</option>
                  <option value="Employee’s ID / Office Id">Employee’s ID / Office Id</option>
                  <option value="Driver’s License">Driver’s License</option>
                  <option value="Professional Regulation Commission (PRC) ID">Professional Regulation Commission (PRC) ID</option>
                  <option value="Passport">Passport</option>
                  <option value="Senior Citizen ID">Senior Citizen ID</option>
                  <option value="SSS ID">SSS ID</option>
                  <option value="COMELEC / Voter’s ID / COMELEC Registration Form">COMELEC / Voter’s ID / COMELEC Registration Form</option>
                  <option value="Philippine Identification (PhilID)">Philippine Identification (PhilID)</option>
                  <option value="NBI Clearance">NBI Clearance</option>
                  <option value="Integrated Bar of the Philippines (IBP) ID">Integrated Bar of the Philippines (IBP) ID</option>
                  <option value="Firearms License">Firearms License</option>
                  <option value="AFPSLAI ID ">AFPSLAI ID </option>
                  <option value="PVAO ID">PVAO ID</option>
                  <option value="AFP Beneficiary ID">AFP Beneficiary ID</option>
                  <option value="BIR (TIN)">BIR (TIN)</option>
                  <option value="Pag-Ibig ID">Pag-Ibig ID</option>
                  <option value="Person’s With Disability (PWD) ID">Person’s With Disability (PWD) ID</option>
                  <option value="Solo Parent ID">Solo Parent ID</option>
                  <option value="Pantawid Pamilya Pilipino Program (4Ps) ID">Pantawid Pamilya Pilipino Program (4Ps) ID</option>
                  <option value="Barangay ID">Barangay ID</option>
                  <option value="Philippine Postal ID">Philippine Postal ID</option>
                  <option value="Phil-health ID">Phil-health ID</option>
                  <option value="School ID">School ID</option>
                  <option value="Other valid government-issued IDs">Other valid government-issued IDs</option>
                </Form.Select>
              </FloatingLabel>

              {Boolean(
                errors && errors.resident_record_id?.type === "required"
              ) && <small className="text-danger">This field is required</small>}
            </Form.Group>
          </Col>

          <Col sm={12} md={6}>
            <Form.Group className="form-group">
              <FloatingLabel label="Category ID Number">
                <Form.Control
                  type="text"
                  placeholder="Category ID Number"
                  defaultValue={resident?.category_id_no || ""}
                  className={
                    Boolean(errors && errors.category_id_no?.type === "required")
                      ? "border border-danger"
                      : ""
                  }
                  {...register("category_id_no", { ...requiredValidation })}
                />
              </FloatingLabel>

              {Boolean(errors && errors.category_id_no?.type === "required") && (
                <small className="text-danger">This field is required</small>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* <Form.Group className="form-group">
          <FloatingLabel label="Valid Id">
            <Form.Control
              type="file"
              className={
                Boolean(
                  errors && errors.valid_id?.type === "required"
                )
                  ? "border border-danger"
                  : ""
              }
              {...register("valid_id", { ...requiredValidation })}
            />
          </FloatingLabel>

          {Boolean(
            errors && errors.valid_id?.type === "required"
          ) && <small className="text-danger">This field is required</small>}
        </Form.Group> */}

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
