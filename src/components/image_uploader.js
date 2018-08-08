import React, {Component} from 'react'
import {Button,TextField} from "@material-ui/core/";
import ReactDOM from "react-dom";

class ImgUploader extends Component {
    constructor(props) {
        super(props)
        this.state = {images: ""};
        this.onChange = this.onChange.bind(this)
        this.fireInputOnClick = this.fireInputOnClick.bind(this)
    }

    onChange(e) {
        const {input: {onChange}} = this.props
        console.log( e.target.files[0].name);
        this.setState({images: e.target.files[0].name});
        onChange(e.target.files[0])
    }

    fireInputOnClick(){
        var inputDom = ReactDOM.findDOMNode(this.refs.imageUpload)
        inputDom.click();
    }

    render() {

        return (
            <div style={{display: "flex"}}>
                <input
                    ref="imageUpload"
                    style={{display: "none"}}
                    type="file"
                    onChange={this.onChange}
                />
                <Button color="primary" variant="raised" style={{margin: '15px 15px 5px 5px'}} onClick={this.fireInputOnClick}>
                Upload Images</Button>
                <TextField
                    style={{width: "40%"}}
                    value={this.state.images}
                    disabled
                />
            </div>
        )
    }
}

export default ImgUploader;