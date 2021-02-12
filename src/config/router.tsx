import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Projects from '../templates/Projects';
import Project from '../templates/Project';
import ProjectSettings from '../templates/ProjectSettings';
import Invitation from '../templates/Invitation';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/invitation/:invitationCode" component={Invitation} />
        <Route path="/projects/:projectId" component={Project} />
        <Route path="/projects/settings" component={ProjectSettings} />
        <Route exact path="/" component={Projects} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
