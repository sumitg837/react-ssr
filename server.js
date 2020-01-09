import "@babel/polyfill"
import express from 'express'
import React from 'react';
import { renderToString } from 'react-dom/server';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable-ssr-addon';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { createMemoryHistory } from 'history';
import { matchPath } from "react-router-dom";
import path from 'path'


import App from './src/components/app'
import tasks from './src/reducers'
import data from './src/helpers'
import Routes from './src/routes'
import apiIndex from './src/routes/apiIndex'

const manifest = require('./dist/react-loadable-ssr-addon.json');
const history = createMemoryHistory()


const PORT = process.env.PORT || 5001
const app = express()

app.use('/dist', express.static('dist'))

// app.use(express.static(path.join(__dirname + '../dist')));
app.use('/api', apiIndex)

/* Add headers as webpack dev server runs on port 5000 */
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${PORT}`);
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.get('*', (req, res) => {
    try {
        const store = createStore(
            tasks,
            applyMiddleware(thunk)
        )
        const modules = new Set();
        const context = {};
        const bundles = getBundles(manifest, [...manifest.entrypoints, ...Array.from(modules)]);

        const styles = bundles.css || [];
        const scripts = bundles.js || [];

        const promises = [];
        Routes.some(route => {
            console.log(req.path)
            if(!route.loadData){
                return Promise.resolve()
            }else{
                const match = matchPath(req.path, route);
                console.log(match)
                if (match) {
                    promises.push(route.loadData(match));
                }
                return match;
            }
        });
        const activeRoute = Routes.find(
            (route) => matchPath(req.url, route)
        ) || {}
        console.log(activeRoute)
        const promise = activeRoute.loadData
            ? activeRoute.loadData(req.path)
            : Promise.resolve()

        Promise.all(promises).then(data => {
            console.log('asdasd', store.getState(), data)
            const html = renderToString(
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        <Loadable.Capture report={moduleName => modules.add(moduleName)}>
                            <App />
                        </Loadable.Capture>
                    </StaticRouter>
                </Provider>
            );
            console.log(modules);

            res.send(`
            <!doctype html >
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>React Loadable SSR</title>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                    ${styles.map(style => {
                        return `<link href="/dist/${style.file}" rel="stylesheet" />`;
            }).join('\n')}
                    <script >window.__INITIAL_DATA__ = ${serialize(data[0])}</script>
                </head>
                <body>
                <div id="root">${html}</div>
                ${scripts.map(script => {
                return `<script src="/dist/${script.file}"></script>`
            }).join('\n')}
                </body>
            </html>
        `)
        });
        
        
    } catch (e) {
        console.error(e)
    }
})

Loadable.preloadAll().then(() => {
    app.listen(PORT, (err) => {
        if (err) {
            console.error(err); return;
        }
        console.info(`listening on port:${PORT}`)
    })
}).catch(err => {
    console.log(err);
});