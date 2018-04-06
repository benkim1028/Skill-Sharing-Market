import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {connect} from "react-redux";
import {fetchPosts} from "../actions";
import _ from 'lodash';



class ItemList extends Component {

    componentDidMount(){
        this.props.fetchPosts();
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                <TableRow key={post.uid}>
                    <TableRowColumn>{post.skill}</TableRowColumn>
                    <TableRowColumn>{post.title}</TableRowColumn>
                    <TableRowColumn>{post.duration}</TableRowColumn>
                </TableRow>
            )
        })
    }


    render() {
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>SKILL</TableHeaderColumn>
                        <TableHeaderColumn>TITLE</TableHeaderColumn>
                        <TableHeaderColumn>UID</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {this.renderPosts()}
                </TableBody>
            </Table>

        )
    }
}

function mapStateToProps(state){
    return { posts : state.posts}
}

export default connect(mapStateToProps, {fetchPosts})(ItemList);