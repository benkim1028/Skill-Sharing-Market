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
import {showLoading, fetchPosts} from "../actions";
import _ from 'lodash';



class ItemList extends Component {

    constructor(props){
        super(props);

        this.renderSellPosts = this.renderSellPosts.bind(this);
        this.renderBuyPosts = this.renderBuyPosts.bind(this);
    }

    componentDidMount(){
        this.props.showLoading();
        this.props.fetchPosts(this.props.category, this.props.transaction);
    }

    renderBuyPosts() {
        return _.map(this.props.posts, post => {
            return (
                <TableRow key={post.uid}>
                    <TableRowColumn>{post.subCategory}</TableRowColumn>
                    <TableRowColumn>{post.title}</TableRowColumn>
                    <TableRowColumn>{post.duration}</TableRowColumn>
                </TableRow>
            )
        })
    }
    renderSellPosts() {
        return _.map(this.props.posts, post => {
            return (
                <TableRow key={post.uid}>
                    <TableRowColumn>{post.subCategory}</TableRowColumn>
                    <TableRowColumn>{post.title}</TableRowColumn>
                    <TableRowColumn>{post.duration}</TableRowColumn>
                    <TableRowColumn>{post.price}</TableRowColumn>
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
                        <TableHeaderColumn>TIME</TableHeaderColumn>
                        {this.props.transaction === "sell" ? <TableHeaderColumn>Price</TableHeaderColumn> : null}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {this.props.transaction === "buy" ? this.renderBuyPosts() : this.renderSellPosts()}
                </TableBody>
            </Table>

        )
    }
}

function mapStateToProps(state){
    return { posts : state.posts}
}

export default connect(mapStateToProps, {showLoading, fetchPosts})(ItemList);