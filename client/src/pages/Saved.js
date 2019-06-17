import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

  class Saved extends Component {
    // Setting our component's initial state
    state = {
      books: []
    };
    componentDidMount() {
        this.loadBooks();
      }

    loadBooks = () => {
        API.getBooks()
        .then(res => this.setState({books: res.data})
            )
            .catch(err => console.log(err));
    }
    
    render() {
      return (
        <Container fluid>
          <Row>
            <Col size="md-12 sm-12">
              <Jumbotron>
                <h1>Saved books</h1>
              </Jumbotron>
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => {
                    return (
                      <ListItem key={book._id}>
                        <img src={book.img} alt={book.title} ></img>
                        <a href={book.link}>
                          <strong>
                            {book.title} by {book.authors}
                          </strong>
                        </a>
                        <p>{book.description}</p>
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Col>
          </Row>
        </Container>
      );
    }
  }
  
  export default Saved;
  