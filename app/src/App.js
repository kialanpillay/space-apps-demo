import React from "react";
import WorldwindGlobe from "worldwind-react-globe";
import Globe from "react-globe.gl";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: null,
      observatories: null,
      res: false,
    };
    this.globeEl = React.createRef();
  }
  componentDidMount() {
    //this.getObservatories();
    this.getLocations();
    const globe = this.globeEl;
    globe.current.controls().autoRotate = true;
    globe.current.controls().autoRotateSpeed = 3;
  }

  getLocations = async () => {
    const url = "https://sscweb.gsfc.nasa.gov/WS/sscr/2";
    const endpoint = `${url}/locations/noaa18,iss/20201001T000000Z,20201001T001000Z/`;
    fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          locations: response.Result,
          res: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getObservatories = () => {
    const url = "https://sscweb.gsfc.nasa.gov/WS/sscr/2";
    const endpoint = `${url}/observatories/`;
    fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          observatories: response.Observatory,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const layers = [
      "coordinates",
      "view-controls",
      "stars",
      "atmosphere-day-night",
    ];

    let data = [];
    if (this.state.res) {
      data = this.state.locations.Data[1].map((location, index) => ({
        lat: location.Coordinates[1][0].Latitude[1][0],
        lng: location.Coordinates[1][0].Longitude[1][0],
        altitude: (location.RadialLength[1][0] - 6378.137) / 10000,
        color: ["green","red"][index % 2],
      }));
    }
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Container>
                <Row className="justify-content-center">
                  <Col md="auto">
                    <h1 className="brand" style={{ fontSize: "10rem" }}>
                      SKYBOX
                    </h1>
                    <h2 style={{ fontSize: "2rem", fontWeight: 200 }}>
                      04.10.2020
                    </h2>
                  </Col>
                </Row>
                <Globe
                  ref={this.globeEl}
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                  width={720}
                  height={484}
                  pointsData={data}
                  pointAltitude="altitude"
                  pointColor="color"
                />
              </Container>
            </Route>
            <Route exact path="/globe"></Route>
            <Route exact path="/worldwind">
              <WorldwindGlobe
                layers={layers}
                latitude={34.2}
                longitude={-119.2}
                altitude={10e6}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
