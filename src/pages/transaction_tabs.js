import React, {Component} from 'react';
import {Tabs, Tab} from '@material-ui/core';
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import {Paper, Button} from "@material-ui/core";
import ItemList from "../containers/items_list";


const styles = {
    paperStyle: {
        width: 96 + '%',
        margin: 2 + '%',
        textAlign: 'center',
        display: 'inline-block',
    },
    headline: {
        fontSize: 24,
        paddingTop: 16,
        paddingLeft: 16,
        marginBottom: 12,
        fontWeight: 400,
        float: 'left'
    },
    button: {
        float: 'right',
        margin: 15 + 'px'
    }



};

export default class Transaction_tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'sell',
        };
    }

    handleChange = (event, value) => {
        this.setState({
            value: value,
        });
    };

    renderTab(transaction){
        return(
            <div>
                <div style={{display: 'flex', justifyContent: "space-between"}}>
                    <h2 style={styles.headline}>{transaction} Tab</h2>
                    <Button style={styles.button} onClick={() => this.props.history.push(`/buy&sell/${this.props.match.params.category}/posts/new_${transaction}`)} variant="raised" color="primary">new Post</Button>
                </div>
                <ItemList category={this.props.match.params.category} transaction={transaction} />
            </div>
        )
    }


    render() {
        const transaction = this.state.value;
        return (
            <div className="div-fullpage">
                <Header/>
                <h1 className="text-center">{this.props.match.params.category}</h1>
                <Paper className="div-content-fullpage" style={styles.paperStyle}>
                    <Tabs
                        value={transaction}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Buy" value="buy"/>
                        <Tab label="Sell" value="sell"/>
                    </Tabs>
                    {this.renderTab(transaction)}
                </Paper>
                <Footer/>
            </div>
        );
    }
}
