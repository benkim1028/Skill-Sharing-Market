import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Header from "./Common/Header";
import Footer from "./Common/Footer";
import {Paper, RaisedButton} from "material-ui";
import ItemList from "../containers/item_lists";


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
        float: 'right'
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
            <div>
                <Header/>
                <Paper style={styles.paperStyle} zDepth={1}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <Tab label="Buy" value="buy">
                            <div>
                                <div style={{display: 'flex'}}>
                                    <h2 style={styles.headline}>Buy Tab</h2>
                                    <RaisedButton style={styles.button} onClick={() => this.props.history.push('/buyNsell/posts/new')} label="new Post" primary={true} style={{margin: '15px'}} />
                                </div>
                                <ItemList/>
                            </div>
                        </Tab>
                        <Tab label="Sell" value="sell">
                            <div>
                                <h2 style={styles.headline}>Sell Tab</h2>
                                <p>
                                    This tab will be used for selling.
                                </p>
                                <ItemList/>
                            </div>
                        </Tab>
                    </Tabs>
                </Paper>
                <Footer/>
            </div>
        );
    }
}
