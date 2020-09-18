import React from "react";
import Globe from "worldwind-react-globe";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default class App extends React.Component {
  render() {
    const layers = [
      "eox-sentinal2-labels",
      "coordinates",
      "view-controls",
      "stars",
      "atmosphere-day-night",
    ];

    return (
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            <img
              alt="Space Apps 2020 Logo"
              src="/Space_Apps_Logos/PNG/Square White.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            C E L E S T I A L
          </Navbar.Brand>
        </Navbar>
        <Globe
          layers={layers}
          latitude={34.2}
          longitude={-119.2}
          altitude={10e6}
        />
      </div>
    );
  }
}
