import React from 'react'
import './index.css'
import {Provider} from 'react-redux'
import {createRoot} from 'react-dom/client'
import {HashRouter} from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import {App} from 'app/App'
import {store} from 'store/Store'


const container = document.getElementById('root') as HTMLElement
const root = createRoot(container!)

root.render(
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()