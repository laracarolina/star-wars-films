import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import FilmDetails from '../pages/FilmDetails/FilmDetails';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/film-details" exact component={FilmDetails} />
    </Switch>
  )
}

export default Routes;
