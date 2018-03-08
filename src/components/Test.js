// import React, {Component} from "react";
// import axios from "axios/index";
// import Header from "./Common/Header";
//
//
// class Test extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             data: null,
//         };
//
//     }
//
//     componentDidMount() {
//         var currentpage = this;
//         axios({
//             headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
//             method: 'get',
//             url: 'http://localhost:8080/webapi/testing',
//             mode: 'cors'
//         }).then(function(response){
//             if(response.status === 200){
//                 currentpage.setState({data: response.data})
//             }
//         });
//     }
//
//     render(){
//         return(
//             <div>
//                 <Header/>
//                 <h1>why this one is not working sssssssssssss</h1>
//                 <p>{this.state.data}</p>
//                 <p>this one should work</p>
//             </div>
//         );
//     }
//
// }
//
// export default Test;