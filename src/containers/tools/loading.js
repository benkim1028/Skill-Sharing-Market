import React, {Component} from 'react';
import {Dialog, CircularProgress, DialogTitle, DialogContent} from "@material-ui/core";
import {connect} from "react-redux";


class Loading extends Component {
    render() {
        return (
            <div>
                <Dialog
                    open={this.props.loading.open}
                    aria-labelledby="responsive-dialog-title">
                    <DialogTitle>Loading</DialogTitle>
                    <DialogContent>
                        <CircularProgress
                            size={80}
                            style={{display: 'inline-block', position: 'relative'}}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {loading: state.loading}
}

export default connect(mapStateToProps)(Loading);
