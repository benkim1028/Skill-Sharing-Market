import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Header from "./Common/Header";
import Footer from "./Common/Footer";


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
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
        <Header />
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab label="Buy" value="buy">
            <div>
              <h2 style={styles.headline}>Buy Tab</h2>
              <p>
                This tab will be used for Buying
              </p>
            </div>
          </Tab>
          <Tab label="Sell" value="sell">
            <div>
              <h2 style={styles.headline}>Sell Tab</h2>
              <p>
                This tab will be used for selling.
              </p>
            </div>
          </Tab>
        </Tabs>
        <Footer />
      </div>
    );
  }
}
