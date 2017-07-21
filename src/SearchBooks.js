import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as BooksAPI from './BooksAPI';
import BooksGrid from './BooksGrid';

class SearchBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  state = {
    books: []
  }

  onInputChange = (value) => {
    if (value.trim()) {
      BooksAPI.search(value, 20).then((searchResultsBook) => {
        if (_.isArray(searchResultsBook)) {
          this.props.books.map(book => {
            searchResultsBook.map(sBook => {
              if(sBook.id === book.id) {
                 sBook.shelf = book.shelf;
              }
            });
          });
        }

        this.setState({
          books: searchResultsBook
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
    const debounceInput = _.debounce(this.onInputChange, 300);
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
          <BooksGrid
            books={books}
            onShelfChange={onShelfChange}
           />
        </div>
      </div>
    )
  }
}

export default SearchBooks;
