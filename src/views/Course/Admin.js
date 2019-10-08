import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import Widget02 from '../Widgets/Widget02';
import axios from 'axios';
class Admin extends Component {

    state = {
        data: []
      }
    
      componentDidMount() {
        axios.get(`http://localhost:3000/api/courses/`)
          .then(res => {
            const data = res.data;
            this.setState({ data });
          })
      }
    price = (data) =>{
        if (data.Course_Info.price === new String() || data.Course_Info.price === 0 ) {
                return 'Gratis'
            } else if(data.Course_Info.price < 500000){
                return Math.round(data.Course_Info.price/100)/10 + 'K'
            } else if(data.Course_Info.price < 1000000000){
             return Math.round(data.Course_Info.price/100000)/10 + 'JT'
            }
        }
        warna = (data) => {
            if (data === 'Gratis') {
                return 'success'
            }else{
                return 'primary'
            }
        }

render() {

    return (
        <div className="animated fadeIn">
        <Row>
            {this.state.data.map(data=>{
                console.log(data)

                return(
          <Col xs="12" sm="6" lg="3">
            <Widget02 header={data.Course_Info.title} mainText={this.price(data)} icon="fa fa-cogs" color={this.warna(this.price(data))} footer link={"#/courses/"+data._id} />
          </Col>
          )
            })}
        </Row>
        </div>
    )
}
}

export default Admin;