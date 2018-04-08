import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Header from "./Common/Header";
import Footer from "./Common/Footer";
import {Paper, RaisedButton} from "material-ui";
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

export default class BuyAndSellTabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'buy',
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };


    render() {
        return (
            <div className="div-fullpage">
                <Header/>
                <Paper className="div-content-fullpage" style={styles.paperStyle} zDepth={1}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <Tab label="Buy" value="buy">
                            <div>
                                <div style={{display: 'flex', justifyContent: "space-between"}}>
                                    <h2 style={styles.headline}>Buy Tab</h2>
                                    <RaisedButton style={styles.button} onClick={() => this.props.history.push(`/buy&sell/${this.props.match.params.category}/posts/new_buy`)} label="new Post" primary={true} />
                                </div>
                                {this.state.value === "buy"? <ItemList category={this.props.match.params.category} transaction="buy" /> : null}
                            </div>
                        </Tab>
                        <Tab label="Sell" value="sell">
                            <div>
                                <div style={{display: 'flex', justifyContent: "space-between"}}>
                                    <h2 style={styles.headline}>Sell Tab</h2>
                                    <RaisedButton style={styles.button} onClick={() => this.props.history.push(`/buy&sell/${this.props.match.params.category}/posts/new_sell`)} label="new Post" primary={true} />
                                </div>
                                {this.state.value === "sell"? <ItemList category={this.props.match.params.category} transaction="sell" /> : null}
                            </div>
                        </Tab>
                    </Tabs>
                </Paper>
                <Footer/>
            </div>
        );
    }
}
