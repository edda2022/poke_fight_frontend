import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import Container from "react-bootstrap/Container";
export default function OurNavbar() {
  return (
    <Navbar bg="warning" expand="lg" className="fixed-top p-1">
      {/* <Container> */}
      <a className="navbar-brand fs-5 mx-2" href="/">
        <img
          src="https://www.pngall.com/wp-content/uploads/13/Pokemon-Logo-PNG-Pic.png"
          alt="Logo"
          width="30"
          height="24"
          className="d-inline-block align-text-top"
        ></img>
        Pokémon
      </a>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/" className="fs-6">
            Home
          </Nav.Link>
          <Nav.Link href="/pokemon" className=" fs-6">
            Pokémons
          </Nav.Link>
          <Nav.Link href="/pokefight" className=" fs-6 ">
            Poké Fight
          </Nav.Link>
          <Nav.Link href="/leaderboard" className=" fs-6 ">
            Leaderboard
          </Nav.Link>
          <Nav.Link href="/berries" className=" fs-6 ">
            Berries
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
}
