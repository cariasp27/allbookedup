import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import SearchForm from "../components/Form";

  class Books extends Component {
    // Setting our component's initial state
    state = {
      search: "",
      books: [],
    };
    // Handles updating component state when the user types into the input field
    handleInputChange = event => {
      this.setState({ search: event.target.value });
    };

    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    handleFormSubmit = event => {
      event.preventDefault();
        API.searchBooks(this.state.search)
          .then(res => {
      let response = res.data.items;
      let searchedbooks = [];
      console.log(response)
      for (let i=0; i < response.length; i++) {
        let book = {};
        let info = response[i].volumeInfo;
        book.title = info.title;
        book.authors = info.authors;
        book.desc = info.description;
        book.img = info.imageLinks.thumbnail;
        book.link = response[i].selfLink;
        searchedbooks.push(book)
      }
      this.setState({books: searchedbooks})
      console.log(this.state.books)
        })
          .catch(err => console.log(err));
      
    };
  
    render() {
      return (
        <Container fluid>
          <Row>
            <Col size="md-12 sm-12">
              <Jumbotron>
                <h1>Google Book Search</h1>
                <SearchForm             
                handleFormSubmit={this.handleFormSubmit}
                handleInputChange={this.handleInputChange}
                />
              </Jumbotron>
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => {
                    return (
                      <ListItem key={book._id}>
                        <p>
                          <strong>
                            {book.title} by {book.author}
                          </strong>
                        </p>
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
  
  export default Books;
  