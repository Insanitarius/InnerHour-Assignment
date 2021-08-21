import React from "react";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./components/home";
import ItemList from "./components/itemList";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pomodoro from "./components/pomodoro";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/pomodoro" component={Pomodoro} />
          <Route exact path="/itemlist" component={ItemList} />
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
