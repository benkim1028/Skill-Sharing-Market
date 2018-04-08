import React, {Component} from 'react';

export default class Footer extends Component{
    render() {
        return(
            <footer className="text-white text-center" style={{paddingTop: 13 + 'px', paddingBottom: 7 + 'px', backgroundColor: '#3949AB'}}>
                <p>&copy; Withumb 2018</p>
            </footer>
        )
    }
}
