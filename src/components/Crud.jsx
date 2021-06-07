import React from 'react';
import NewPost from './NewPost';
import PostsContainer from './PostsContainer';
import ChangePost from './ChangePost';
import Post from './Post';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//компонент с роутами и больше ни чего
export default function Crud() {
    
    return (
        <Router>
            <main className="main-container">
                <Switch>
                    <Route path="/post/change" exact component={ChangePost} />
                    <Route path="/post/new" exact component={NewPost} />
                    <Route path="/post/:id" exact component={Post} />
                    <Route path="/" exact component={PostsContainer} />
                </Switch>
            </main>
        </Router>
    )
}
