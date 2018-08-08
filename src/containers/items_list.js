import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@material-ui/core/';
import {connect} from "react-redux";
import {showLoading, fetchPosts} from "../actions";
import * as _ from 'lodash';
import history from "../history";



class ItemList extends Component {

    constructor(props){
        super(props);

        this.renderPosts = this.renderPosts.bind(this);
    }

    componentWillMount(){
        this.props.showLoading();
        this.props.fetchPosts(this.props.category, this.props.transaction);
    }

    componentDidUpdate(prevProps){
        if(this.props.transaction != prevProps.transaction){
            this.props.showLoading();
            this.props.fetchPosts(this.props.category, this.props.transaction);
        }
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                this.renderPost(post)
            )
        })
    }

    renderPost(post) {
        const isSellTab = this.props.transaction === "sell";
        return (
            <TableRow style={{cursor: 'pointer'}} hover key={post.uid} onClick={() => alert("yay")}>
                <TableCell>{this.renderImageOfItem(post.url)}</TableCell>
                <TableCell>{post.subCategory}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.duration}</TableCell>
                {isSellTab && <TableCell>{post.price}</TableCell>}
            </TableRow>
        )
    }

    renderImageOfItem(url = "http://res.cloudinary.com/hcvi5x32d/image/upload/v1529012950/noimage.jpg"){
        return <img style={{width: '100px', height: '100px'}} src={url}/>
    }

    renderTableHeader(){
        return(
            <TableHead>
                <TableRow>
                    <TableCell>IMAGE</TableCell>
                    <TableCell>SKILL</TableCell>
                    <TableCell>TITLE</TableCell>
                    <TableCell>TIME</TableCell>
                    {this.props.transaction === "sell" ? <TableCell>Price</TableCell> : null}
                </TableRow>
            </TableHead>
        )
    }

    renderTableBody(){
        return(
            <TableBody>
                {this.renderPosts()}
            </TableBody>
        )
    }


    render() {
        return (
            <Table onCellClick={() => {console.log(this); history.push(`/buy&sell/${this.props.category}/posts/`);}}>
                {this.renderTableHeader()}
                {this.renderTableBody()}
            </Table>

        )
    }
}

function mapStateToProps(state){
    return { posts : state.posts}
}

export default connect(mapStateToProps, {showLoading, fetchPosts})(ItemList);