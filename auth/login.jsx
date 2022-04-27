import React from "react";
import Head from "next/head";
import {
  Container,
  Card,
  Image,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import { useForm } from "react-hook-form";

import { AuthService } from "lib/services";

const authService = new AuthService();

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [disabled, setDisabled] = React.useState(false);

  const handleFormSubmit = async (credentials) => {
    // setDisabled(true);
    await authService.userLogin(credentials);
    // setDisabled(false);
  };

  return (
    <>
      <Head>
        <title>PITOGO &mdash; Log In</title>
      </Head>

      <Container fluid className="auth-container">
        <div className="col-sm-12 col-md-3">
          <Card>
            <Card.Body>
              <div className="text-center mb-4">
                <Image
                  fluid
                  src="/assets/images/pitogo-seal.png"
                  alt="Brgy.pitogo logo"
                  height={180}
                  width={180}
                />
              </div>

              <h4>Log In</h4>
              <p>Please provide your account credentials &mdash;</p>

              <Form onSubmit={handleSubmit(handleFormSubmit)}>
                <Form.Group className="form-group">
                  <FloatingLabel label="E-mail">
                    <Form.Control
                      type="email"
                      className={
                        Boolean(errors && errors.email?.type === "required")
                          ? "border border-danger"
                          : ""
                      }
                      {...register("email", { required: true })}
                      placeholder="E-mail"
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="form-group">
                  <FloatingLabel label="Password">
                    <Form.Control
                      type="password"
                      className={
                        Boolean(errors && errors.password?.type === "required")
                          ? "border border-danger"
                          : ""
                      }
                      {...register("password", { required: true })}
                      placeholder="Password"
                    />
                  </FloatingLabel>
                </Form.Group>

                <Button
                  type="submit"
                  variant="info"
                  className="w-100"
                  disabled={disabled}
                >
                  LOG IN
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default LoginPage;
