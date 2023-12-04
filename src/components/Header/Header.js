import React from "react";
import { Navbar, Form, Button, ButtonGroup } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";

const Header = () => {
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    console.info("logout");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");
    swal("Logged Out Successfully!", " ", "info", {
      button: false,
      timer: 1000,
    }).then(() => navigate("/login"));
  };

  const authButton = () => {
    if (!sessionStorage.getItem("token")) {
      return (
        <ButtonGroup>
          <Button className= "auth-wrapper" variant="secondary" as={Link} to="/login">
            Login
          </Button>
          <Button className= "auth-wrapper" variant="secondary" as={Link} to="/signup">
            Signup
          </Button>
        </ButtonGroup>
      );
    } else {
      return (
        <Button variant="secondary" onClick={handleLogoutClick}>
          Logout
        </Button>
      );
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      bg="primary"
      variant="dark"
      className="mb-3 navbar-light"
    >
      <Navbar.Brand as={Link} to="/home" className="mx-3">
        TWEET
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
      <Form inline className="mx-3">
        {authButton()}
      </Form>
    </Navbar>
  );
};

export default React.memo(Header);
