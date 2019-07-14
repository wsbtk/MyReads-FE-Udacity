import React from 'react'
import BookSearch from './BookSearch';
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import ShelfRack from './ShelfRack';


class BooksApp extends React.Component {
  state = {
      books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }
  bookMove = (book, shelf) => {
    BooksAPI.update(book, shelf);

    BooksAPI.getAll().then((books) => {
      this.setState({ books:books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ShelfRack
            allBooks = {this.state.books}
            bookMove = {this.bookMove}
          />          
        )}/>
        <Route exact path='/bookSearch' render={() => (
          <BookSearch
            bookMove = {this.bookMove}
            books = {this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
