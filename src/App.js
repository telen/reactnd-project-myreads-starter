import React from 'react'
import { Route } from 'react-router-dom';
import BooksShelf from './BooksShelf';
import SearchBooks from './SearchBooks';
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
      this.setState({
        books
      });
    });
  }

  handleShelfChange = (book, shelfName) => {
    console.log(book.shelf, shelfName);
    this.setState((state) => {
      const _book = state.books.find(b => b.id === book.id);
      if (_book) {
        _book.shelf = shelfName;
      } else {
        book.shelf = shelfName;
        state.books.push(book);
      }

      return { books: state.books };
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={({ history }) => (
          <SearchBooks
            history={history}
            onShelfChange={this.handleShelfChange}
          />
        )} />
        <Route exact path="/" render={({ history }) => (
          <BooksShelf
            books={this.state.books}
            onAddBook={() => { history.push('/search') }}
            onShelfChange={this.handleShelfChange}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
