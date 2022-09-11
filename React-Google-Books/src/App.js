import { React, useState } from "react";
import "./App.css";
import axios from 'axios'
import BookCard from "./components/Card/BookCard";

function App() {
    const [books, setBook] = useState("");
    const [result, setResult] = useState();
    const [errmsg, setErrmsg] = useState("");
    const [fromDb, setFromDb] = useState(false)
    const [haveRead, setHaveRead] = useState("no");
    const [addEnable, setAddEnable] = useState(true);


    function handleChange(event) { 
        const books = event.target.value;
        setBook(books);
    }

    function handleHaveRead(response) {
      response.map((readbook) => {
            readbook.volumeInfo.industryIdentifiers.map((val) => {
                if (val.type == 'ISBN_13') {
                    if (val.identifier === books) {
                        setHaveRead("yes");
                    }
                }

            })
        })

    }


    function validate() {

        let isbnError = "";
        const reg = /^[9][0-9]{12}$/;
        if (!books || reg.test(books) === false) {
            isbnError = "Enter Valid ISBN ";
        }

        if (isbnError) {
            setErrmsg(isbnError)
            setResult("")
            return false;
        }
        setErrmsg("")
        return true;

    }

    function handleSubmit(event) {
        event.preventDefault();
        if (validate()) {

          
            axios.get('/findBookByIsbn/' + books).then((response) => {
                if (response.data == "") {
                    callapi()
                }

                else {
                    setResult(response.data);
                    setAddEnable(false);
                    setFromDb(true);
                }

            })
        }


    }

    function callapi() {
        axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + books).then((response) => {
            setResult(response.data.items[0]);
            setFromDb(false);
        }).then((response) => {
            axios.get('https://www.googleapis.com/books/v1/users/110459311993195018931/bookshelves/4/volumes').then((response) => {
                handleHaveRead(response.data.items);
                setAddEnable(true);

            })
        }).catch((error) => {
            setResult("");
            setErrmsg("Sorry,no results found!")
        })
    }



    return (
        <div className="container style={{backgroundImage: `url(${booklibrary}` }}">
            <h1>Scan Book</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control mt-20 input-area"
                        placeholder="Search books"
                        autoComplete="off"
                        onChange={handleChange} 
                     />
                        
                </div>
                <button type="submit" className="btn btn-danger search-btn">Search</button>
            </form>
            <br/>
            <div >
                {
                    (result && (
                        <div>
                            {fromDb ? <BookCard data={result} isbn={books} addEnable={addEnable} haveRead={haveRead} fromDb={fromDb}  /> :
                                <BookCard data={result.volumeInfo} isbn={books}  addEnable={addEnable} haveRead={haveRead}  fromDb={fromDb} />}
                        </div>
                    ))}
            </div>
            <div className="err-msg">{errmsg}</div>
        </div>
    );
}

export default App;
