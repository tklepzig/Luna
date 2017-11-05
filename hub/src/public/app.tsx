import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./app.scss";
import Communication from "./components/Communication";
import Presentation from "./components/Presentation";
import Start from "./components/Start";
import Touchpad from "./components/Touchpad";

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Start} />
            <Route exact path="/pres" component={Presentation} />
            <Route exact path="/mouse" component={Touchpad} />
            <Route exact path="/comm" component={Communication} />
        </Switch>
    </BrowserRouter>
), document.getElementById("root"));
