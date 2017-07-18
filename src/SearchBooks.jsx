import React from 'react';
import _ from 'lodash';
import * as BooksAPI from './BooksAPI';
import Book from './Book'

class SearchBooks extends React.Component {

  state = {
    books: []
  }

  onInputChange = (value) => {
    console.log(value);
    if (value.trim()) {
      BooksAPI.search(value, 10).then((books) => {
        console.log(books);
        this.setState({
          books,
        });
      })
    } else {
      this.setState({
        books: []
      });
    }

  }

  render() {
    const { history, onShelfChange } = this.props;
    const debounceInput = _.debounce(this.onInputChange, 500);
    const { books } = this.state;


    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => {
            history.goBack();
          }}>Close</a>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              onChange={(e) => {

                debounceInput(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book => (
              <Book
                key={book.id}
                book={book}
                onShelfChange={onShelfChange}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
