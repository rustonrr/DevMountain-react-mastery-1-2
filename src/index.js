import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Task from './Task';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <div>
                <Switch>
                    <Route path='/' exact component={App} />
                    <Route path='/Task/:id' component={Task} />
                </Switch>
            </div>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
