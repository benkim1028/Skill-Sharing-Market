import React, {Component} from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {Dialog} from "material-ui";
import {connect} from "react-redux";


class Loading extends Component {
    render() {
        return (
            <div>
                <Dialog
                    title="Loading"
                    titleStyle={{textAlign: "center"}}
                    contentStyle={{maxWidth: 150}}
                    open={this.props.loading.open}>
                    <RefreshIndicator
                        size={80}
                        left={10}
                        top={0}
                        status="loading"
                        style={{display: 'inline-block', position: 'relative',}}
                    />
                </Dialog>
            </div>
        );
    }

}

function mapStateToProps(state){
    return {loading: state.loading}
}

export default connect(mapStateToProps)(Loading);
