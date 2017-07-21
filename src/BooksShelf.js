import React from 'react';
import PropTypes from 'prop-types';
import BooksGrid from './BooksGrid';

const titleMap = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want to Read',
  read: 'Read'
}

class BooksShelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onAddBook: PropTypes.func.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  render() {
    const { books, onAddBook, onShelfChange } = this.props;

    const showingShelf = {};

    if (books && books.length) {
      books.forEach((book) => {
        if (!showingShelf[book.shelf]) {
          showingShelf[book.shelf] = [];
        }
        showingShelf[book.shelf].push(book);
      });
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.keys(titleMap).map(_shelf => (
                <div className="bookshelf" key={_shelf}>
                  <h2 className="bookshelf-title">{titleMap[_shelf]}</h2>
                  <div className="bookshelf-books">
                    <BooksGrid
                      books={showingShelf[_shelf]}
                      onShelfChange={onShelfChange}
                     />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="open-search">
          <a onClick={onAddBook}>Add a book</a>
        </div>
      </div>
    );
  }
}

export default BooksShelf;
