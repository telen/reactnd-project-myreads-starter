import React from 'react';
import Book from './Book'

const titleMap = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want to Read',
  read: 'Read',
  none: 'None'
}

class BooksShelf extends React.Component {
  state = {

  }




  render() {
    const { books, onAddBook, onShelfChange } = this.props;
    const { shelf } = this.state;
    console.log(books);

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
            {Object.keys(showingShelf).map(_shelf => (
                <div className="bookshelf" key={_shelf}>
                  <h2 className="bookshelf-title">{titleMap[_shelf]}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {showingShelf[_shelf].map(book => (
                        <Book
                          key={book.id}
                          book={book}
                          onShelfChange={onShelfChange}
                        />
                      ))}
                    </ol>
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
