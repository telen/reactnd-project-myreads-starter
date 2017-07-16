import React from 'react';
import Book from './Book'

class BooksShelf extends React.Component {
  state = {
    shelf: [],
    currentlyReading:[],
    read: [],
    wantToRead: []
  }

  componentWillReceiveProps(nextProps) {
console.log(nextProps);
    const { books } = nextProps;


    const c = [], r = [], w = [];
    if (books && books.length) {
      books.forEach((book) => {
        switch (book.shelf) {
          case 'currentlyReading':
            c.push(book);
            break;
          case 'read':
            r.push(book);
            break;
          case 'wantToRead':
            w.push(book);
            break;
          default:
            console.log('Not belong to any shelf:', book);
            break;
        }
      });
      this.setState({
        shelf: [
          {
            shelfTitle: 'Currently Reading',
            books: c
          },
          {
            shelfTitle: 'Want to Read',
            books: w
          },
          {
            shelfTitle: 'Read',
            books: r
          }
        ]
      });
    }
  }

  render() {
    const { onAddBook } = this.props;
    const { shelf } = this.state;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelf.map((_shelf, shelfIndex) => (
              <div className="bookshelf" key={shelfIndex}>
                <h2 className="bookshelf-title">{_shelf.shelfTitle}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {_shelf.books.map(book => (
                      <Book book={book} key={book.id} />
                    ))}
                  </ol>
                </div>
              </div>
            ))}
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
