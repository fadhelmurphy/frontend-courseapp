import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, Row, TabContent, TabPane } from 'reactstrap';
import axios from 'axios';
class More extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          content: [],
          lesson:[]
        };
      }
    


      componentDidMount() {
        axios.get(`http://localhost:3000/api/courses/`+this.props.match.params.id)
          .then(res => {
            const content = res.data.Lessons[this.props.match.params.num-1].Contents;
            const lesson = res.data.Lessons[this.props.match.params.num-1].Lesson_Info;
            this.setState({ content,lesson });
            console.log(this.state.lesson);
          }).catch(e=>{
              console.log(e);
          })
      }
    
      les = (data) =>{
        const result = []
        console.log(data)
        data.forEach(element=>{
            result.push(
                <TabContent>
                <TabPane>
                  {element.type === "paragraph" ? <p>{element.content}</p> : element.content}
                </TabPane>
              </TabContent>
            )
        })
        return result;
    }

      render() {
        //   console.log(this.state.lesson)
        return (
          <div className="animated fadeIn">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                      <h4>{this.state.lesson.title}</h4>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col>
                        {this.les(this.state.content)}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        );
      }
}
export default More;