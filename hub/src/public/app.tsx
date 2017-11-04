import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./app.scss";
import Start from "./components/Start";

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Start} />
        </Switch>
    </BrowserRouter>
), document.getElementById("root"));
