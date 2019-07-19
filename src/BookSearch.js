import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class BookSearch extends Component {
    state = {
      query: '',
      BooksSearched: []
    }
  
    updateQuery = (query) => {
      this.setState({ query: query
      })
      this.getBooksSearch(query);
    }
    

    getBooksSearch = (query) => {
      if (query) {
        BooksAPI.search(query).then((BooksSearched) => {
          if(BooksSearched.error) {
            this.setState ({ BooksSearched: [] });
          }else {
            this.setState({BooksSearched : BooksSearched})
          }
        })
      } else {
        this.setState ({ BooksSearched: [] });
      }
    }
// Book Search and moving them to their appropriate shelf on the app
    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
                <Link to="/">
                  <button className="close-search">
                    Close
                  </button>                 
                </Link>
              <div className="search-books-input-wrapper">          
                <input 
                  type="text" 
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                  this.state.BooksSearched.map(BooksSearched => {
                    let shelf = "none";
                    this.props.books.map(book => (
                      book.id === BooksSearched.id ? 
                      shelf = book.shelf : ''                     
                    ));
                    
                    return (
                      <li key={BooksSearched.id}>
                      <Book 
                        book={BooksSearched}
                        bookMove = {this.props.bookMove}
                        currentState = {shelf}
                      />
                    </li>
                    )
                  })
                }
              </ol>
            </div>
          </div>  
        );
    }
}

export default BookSearch; 
