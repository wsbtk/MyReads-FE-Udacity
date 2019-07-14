import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Books from './Books';

  const shelfTypes = [
    { type: 'currentlyReading', title: 'Currently Reading' },
    { type: 'wantToRead', title: 'Want to Read' },
    { type: 'read', title: 'Read' }
  ];

  //Render the BookShelf and the Search Function

class ShelfRack extends Component {
    render () {
        return (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>            
            <div className="list-books-content">
              {shelfTypes.map((shelf, index) => {
                return (
                  <div className="bookshelf" key={index}>
                    <h2 className="bookshelf-title">{shelf.title}</h2>
                    <div className="bookshelf-books">
                      {/* Puts the boos on their appropriate shelves. */}
                      <ol className="books-grid">
                      {
                          this.props.allBooks
                            .filter(book => book.shelf === shelf.type) 
                            .map(book => (
                              <li key = {book.id}>
                              <Books 
                                book = {book}
                                bookMove = {this.props.bookMove}
                                currentState ={shelf.type}
                              />
                            </li>
                            )) 
                        }
                      </ol>
                    </div>
                </div>
                );
              })}
            </div>
            {/* The Search Function */}
            <div className="open-search"> 
                <Link to="/bookSearch">
                  <button>
                    Add a Book
                  </button>                  
                </Link>
            </div>
          </div>
        );
    }
}

export default ShelfRack;