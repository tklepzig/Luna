import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./app.scss";
import Presentation from "./components/Presentation";
import Start from "./components/Start";
import Touchpad from "./components/Touchpad";

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Start} />
            <Route exact path="/pres" component={Presentation} />
            <Route exact path="/mouse" component={Touchpad} />
        </Switch>
    </BrowserRouter>
), document.getElementById("root"));
