import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./sections/Header/Header";
import Home from "./sections/Home/HomeContainer";
import WeatherCity from "./sections/WeatherCity/WeatherCityContainer";
import AddWeatherData from "./sections/AddWeatherData/AddWeatherDataContainer";
import NotFound from "./sections/NotFound/NotFound";
import RemoveAll from "./sections/RemoveAll/RemoveAll";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add" component={AddWeatherData} />
        <Route exact path="/city/:id/week" component={WeatherCity} />
        <Route exact path="/remove-all-data" component={RemoveAll} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
