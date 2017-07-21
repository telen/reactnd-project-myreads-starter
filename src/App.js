import React from 'react'
import { Switch, Route } from 'react-router-dom';
import BooksShelf from './BooksShelf';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
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
    BooksAPI.update(book, shelfName).then(books => {
      this.setState((state) => {
        const oldBooks = Array.from(state.books);
        const diffBook = oldBooks.find(b => b.id === book.id);
        // diffBook not exist, it's a new one
        if (!diffBook) {
          oldBooks.push(book);
        }

        const newBooks = []; // store the updated books from server
        // compare the updated shelf width local books and update their shelves
        Object.keys(books).forEach(shelf => {
          books[shelf].forEach(bookId => {
            const theBook = oldBooks.find(b => b.id === bookId);
            theBook.shelf = shelf;
            newBooks.push(theBook);
          });
        });

        return { books: newBooks };
      });
    });
  }

  render() {
    return (
      <div className="app">
        <Switch>
        <Route path="/search" render={({ history }) => (
          <SearchBooks
            history={history}
            onShelfChange={this.handleShelfChange}
            books={this.state.books}
          />
        )} />
        <Route exact path="/" render={({ history }) => (
          <BooksShelf
            books={this.state.books}
            onAddBook={() => { history.push('/search') }}
            onShelfChange={this.handleShelfChange}
          />
        )} />
        <Route render={() => (
          <h2>404 Not Found</h2>
        )} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
