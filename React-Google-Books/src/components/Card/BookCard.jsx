import React from "react";
import axios from 'axios'
import { useState } from "react";
import "./BookCard.css";

function BookCard({ data, isbn, addEnable, haveRead, fromDb}) {
    const [notes, setNotes] = useState("");
    const {
        title,
        authors,
        pageCount,
        imageLinks,
        thumbnail,
    } = data;


    function handleNotes(event) {
        const notes = event.target.value;
        setNotes(notes);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (addEnable) {
            console.log(data.notes);
            axios.post('/addBook', {
                isbn: isbn,
                title: title,
                authors: authors[0],
                pageCount: pageCount,
                haveRead: haveRead,
                notes: notes,
                thumbnail: imageLinks.thumbnail

            }).then((data) => {
                if (data.status = "200") {
                   console.log("added book");
                }
        

            })
        }
        else {
            axios.get('/removeBook/' + isbn).then((response) => {

            }).then((response) => {
             console.log("removed book")

            })

        }


    }
    return (
       <div className="container">
            <div className="container-form">
                <form onSubmit={handleSubmit}>

                    {addEnable ? <div ><img
                        src={
                            imageLinks.thumbnail
                        }
                        alt={title}
                        className="w-24 mb-4 border-4"
                    /></div> :
                        <div ><img
                            src={
                                thumbnail
                            }
                            alt={title}
                            className="w-24 mb-4 border-4"
                        /></div>
                    }

                    <h4 className="text-xl">Title : {title} </h4>

                    <h4>ISBN :  {isbn}</h4>
                    <h4>Author : {authors}</h4>

                    <h4>Page Count : {pageCount}</h4>

                    {fromDb ?  <h4> Have read :{data.haveRead} </h4>   : <h4>Have read : {haveRead}</h4> }

                    <div className="form-group">
                        {fromDb ? <textarea className="form-control w-25 h-25 text-area"  value={data.notes} placeholder={"Add notes here ..."} id="notes" onChange={handleNotes}></textarea> :
                            <textarea className="form-control  w-25 h-25 text-area" value={notes} id="notes" placeholder={"Add notes here ..."} onChange={handleNotes}></textarea>}
                    </div>
                    {addEnable ? (<div className="form-group">
                        <label for="add"></label>
                        <button type="submit" className="btn btn-danger" rows="5" id="add">Add</button>
                    </div>
                    ) : (<div className="form-group">
                        <label for="delete"></label>
                        <button type="submit" className="btn btn-danger" rows="5" id="delete">Delete</button>
                    </div>)
                }
              
                </form>
            </div>
        </div> 
    );
}

export default BookCard;


