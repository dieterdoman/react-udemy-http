import React, {Component} from 'react';
import Post from "../../../components/Post/Post";
import axios from "../../../axios";
import './Posts.css';
import FullPost from "../FullPost/FullPost";
import {Route} from "react-router";

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    };

    postSelectedHandler = (id) => {
        this.props.history.push({pathname: "/posts/" + id});
    };

    componentDidMount() {
        axios.get('/posts').then(response => {
            const posts = response.data.slice(0, 4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'user'
                }
            });
            this.setState({posts: updatedPosts});
        }).catch(error => {
            this.setState({error: true});
        });
    };

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    <Post key={post.id} title={post.title} author={post.author}
                          clicked={() => this.postSelectedHandler(post.id)}/>
                );
            })
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
            </div>
        );
    }
}

export default Posts;
