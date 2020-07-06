import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { FetchDataAxios } from './components/FetchDataAxios';
import './custom.css'
import { SearchBar } from './components/SearchBar';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={SearchBar} />
                <Route path='/search-bar' component={SearchBar} />
            </Layout>
        );
    }
}
