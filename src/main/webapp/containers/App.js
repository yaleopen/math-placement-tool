import React, {Component} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import InstructorHome from './InstructorHome';
import theme from '@instructure/ui-themes/lib/canvas';
import RubricEditor from "./RubricEditor";
import ApplyTheme from '@instructure/ui-themeable/lib/components/ApplyTheme';
import View from '@instructure/ui-layout/lib/components/View';
import Alert from '@instructure/ui-alerts/lib/components/Alert';
import NavigationBar from "../components/NavigationBar";
import {Link} from "react-router-dom";
import Breadcrumb, {BreadcrumbLink} from '@instructure/ui-breadcrumb/lib/components/Breadcrumb';
import PlacementSummary from "./PlacementSummary";
import StudentHome from "./StudentHome";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from 'react-dnd';

theme.use();

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
        <Link to="/mathplacement"><BreadcrumbLink onClick={() => {
        }}>Placement Calculator</BreadcrumbLink></Link>
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