import React from 'react';
import { Route, Switch, } from 'react-router-dom'

import '../../public/app.css'

import Routes from '../routes'

const App = () =>(
    <div>
        
        <Switch>
            {Routes.map(({ path, exact, component: C, ...rest }) => (
                <Route
                    key={path}
                    path={path}
                    exact={exact}
                    render={(props) => (
                        <C {...props} {...rest} />
                    )}

                />

            ))}

        </Switch>
    </div>
);

export default App