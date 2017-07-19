import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as BooksAPI from './BooksAPI';
import Book from './Book'

class SearchBooks extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  state = {
    books: []
  }

  onInputChange = (value) => {
    if (value.trim()) {
      BooksAPI.search(value, 10).then((books) => {
        this.setState({
          books,
        });
      });
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
            {_.isArray(books) && books.map(book => (
              <Book
                key={book.id}
                book={book}
                onShelfChange={onShelfChange}
              />
            ))}
            {!_.isArray(books) && <div>No Results</div>}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
