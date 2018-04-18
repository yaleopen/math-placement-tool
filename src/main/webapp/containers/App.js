import {Switch, Route, BrowserRouter} from 'react-router-dom'
import React, {Component} from 'react'
import InstructorHome from './InstructorHome'
import theme from '@instructure/ui-themes/lib/canvas'
import RubricEditor from "./RubricEditor";

theme.use();

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path='/mathplacement' component={InstructorHome}/>
                        <Route path='/rubrics' component={RubricEditor}/>
                        <Route render={function(){
                            return <p>Not Found</p>
                        }}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;