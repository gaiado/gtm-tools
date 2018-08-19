import React from "react";
import { Switch, Route } from "react-router-dom";
import TagList from "./TagList";
const Main = () => (
    <Switch>
        <Route exact path="/" component={TagList} />
    </Switch>
);
export default Main;