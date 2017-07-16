import React from 'react'
import { Route } from 'react-router-dom';
import BooksShelf from './BooksShelf';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({
        books
      });
    });
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={({ history }) => (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => {
                history.goBack();
              }}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )} />
        <Route exact path="/" render={({ history }) => (
          <BooksShelf
            books={this.state.books}
            onAddBook={() => { history.push('/search') }}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
