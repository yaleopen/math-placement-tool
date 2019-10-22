import React, {Component} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import InstructorHome from './InstructorHome';
import RubricEditor from "./RubricEditor";
import { ApplyTheme } from '@instructure/ui-themeable';
import { View } from '@instructure/ui-layout';
import { Alert } from '@instructure/ui-alerts';
import NavigationBar from "../components/NavigationBar";
import {Link} from "react-router-dom";
import { Breadcrumb } from '@instructure/ui-breadcrumb';
import PlacementSummary from "./PlacementSummary";
import StudentHome from "./StudentHome";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from 'react-dnd';
import '@instructure/canvas-theme';


class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>
            <Switch>
              <Route path='/mathplacement' component={Home}/>
              <Route path='/quizzes/:quizId/rubrics' component={RubricEditor}/>
              <Route path='/quizzes/:quizId/placements' component={PlacementSummary}/>
              <Route render={function () {
                return <p>Not Found</p>
              }}/>
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

const Home = () => {
  const role = sessionStorage.userRole;
  let homeForRole = <UnauthorizedHome/>;
  if(role === 'instructor') {
    homeForRole = <InstructorHome/>;
  }
  else if(role === 'student'){
    homeForRole = <StudentHome/>;
  }
  return homeForRole;
};

const UnauthorizedHome = () => {
  const breadcrumbs = (
      <Breadcrumb size="large" label="You are here:">
        <Link to="/mathplacement"><Breadcrumb.Link onClick={() => {
        }}>Placement Calculator</Breadcrumb.Link></Link>
      </Breadcrumb>
  );
  return (
      <ApplyTheme theme={ApplyTheme.generateTheme('canvas', {
            'ic-brand-primary': '#00356b',
            'ic-brand-button--primary-bgd': '#00356b',
            'ic-link-color': '#286dc0'
          }
      )}
      >
        <View
            as="div"
            textAlign="start"
            margin="small"
        >
          <NavigationBar breadcrumbs={breadcrumbs}/>
          <Alert
              variant="error"
              margin="small"
          >
            Due to your enrollment, you do not have access to this tool. If you think this is an error, please contact your instructor.
          </Alert>
        </View>
      </ApplyTheme>
  );
};

export default DragDropContext(HTML5Backend)(App);