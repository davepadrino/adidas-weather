import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./sections/Header/Header";
import Home from "./sections/Home/HomeContainer";
import WeatherCity from "./sections/WeatherCity/WeatherCity";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/city/:id/week" component={WeatherCity} />
      </Switch>
    </Router>
  );
}

export default App;
