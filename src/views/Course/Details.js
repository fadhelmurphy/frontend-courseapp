import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Jumbotron,Badge } from 'reactstrap';
import axios from 'axios';
import CKEditor from 'ckeditor4-react';

class Details extends Component{

    state = {
        course: [],
        lesson: [],
        tag:[],
        data:{
            judul:null,
            harga:null,
            lesson:[]
        }
      }
    
      componentDidMount() {
        axios.get(`http://localhost:3000/api/courses/`+this.props.match.params.id)
          .then(res => {
            console.log(res.data);
            const course = res.data.Course_Info;
            const lesson = res.data.Lessons;
            const tag = res.data.Course_Info.tag;
            this.setState({ course,lesson,tag });
          })
      }
      price = (data) =>{
        if (data.price === new String() || data.price === 0 ) {
                return 'Gratis'
            } else if(data.price < 500000){
                return 'Rp. '+Math.round(data.price/100)/10 + '.000'
            } else if(data.price < 1000000000){
             return 'Rp. '+Math.round(data.price/100000)/10 + '.000.000'
            }
        }
        warna = (data) => {
            if (data === 'Gratis') {
                return 'success'
            }else{
                return 'primary'
            }
        }

        badges = (data)=>{
            const items = [];
            data.forEach(element => {
                items.push(
                    <Badge color="secondary" style={{marginRight:1+'%'}}>{element}</Badge>
                );
            })
            return items;
        }

        les = (data) =>{
            const result = []
            data.forEach((element,index)=>{
                const lesson = []
                lesson.push(element);
                console.log(index);
                lesson.forEach((element)=>{
                    result.push(
                        
                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                        <Card>
                          <CardBody>
                            <CKEditor
                    data={element.Lesson_Info.title}
                    type="inline"
                    onChange={event => this.handleChange(index,event)}
                />
                          </CardBody>
                        </Card>
                      </Col>
                      );
                })
            })
            return result;
        }

        handleChange = ( option,changeEvent ) => {
            if (option === 'title') {
            this.state.data.judul = changeEvent.editor.getData();
            this.setState( {
                data: this.state.data
            } );
            console.log(this.state.data);
                
            } else if (option === 'price') {
                this.state.data.harga = changeEvent.editor.getData();
                this.setState( {
                    data: this.state.data
                } );
                console.log(this.state.data);
                
            }else{
                this.state.data.lesson[option] = changeEvent.editor.getData();
                this.setState( {
                    data: this.state.data
                } );
                console.log(this.state.data);
            }
        }

    render(){
        console.log(this.state.course);
        return(
            <div className="animated fadeIn">
            <Row>
                <Col>
            <Jumbotron>
            <h1 className='display-3'>
            <CKEditor
                data={this.state.course.title}
                type="inline"
                onChange={event => this.handleChange('title',event)}
            />
            </h1>
            <p className="lead">{'oleh '+this.state.course.author+', diperbaharui pada '+this.state.course.lastUpdated}</p>
            <p className={"text-uppercase font-weight-bold font-xs text-"+this.warna(this.price(this.state.course))}>
            {'Harga '}
            <CKEditor
                    data={this.price(this.state.course)}
                    type="inline"
                    onChange={event => this.handleChange('price',event)}
                />
                </p>
            <h4>{this.badges(this.state.tag)}</h4>
            <hr className="my-2" />
          </Jumbotron>
          </Col>
            {this.les(this.state.lesson)}
            </Row>
            </div>
        )
    }

}
export default Details