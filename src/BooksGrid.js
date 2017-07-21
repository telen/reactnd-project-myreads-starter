import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Book from './Book'

class BooksGrid extends React.Component {
  static propTypes = {
    books: PropTypes.array,
    onShelfChange: PropTypes.func.isRequired
  }

  render() {
    const { books, onShelfChange } = this.props;

    return (
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
    );
  }
}

export default BooksGrid;
