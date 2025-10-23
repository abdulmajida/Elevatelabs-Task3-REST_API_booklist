const express = require('express');
const app = express();
const port = 3000;

//middleware to parse JSON bodies
app.use(express.json());


let books = [
    { id: 1, title: 'METRO 2033', author: 'dmitry A gluskhovsky' },
    { id: 2, title: ' All Tommorows', author: 'C.M Kosemen' },
];

//GET method

app.get('/books', (req, res) => {
    res.json(books);
});


//POST method
app.post('/books',(req,res)=>{
    const{title,author}=req.body;

    if(!title|| !author){
        return res.status(400).json({message:'Title and author are required.'});
    }

    const newbook={
        id:books.length+1,
        title,
        author,
    }

    books.push(newbook);
    res.status(201).json(newbook);
});

// PUT method

app.put('/books/:id',(req,res)=>{
    const{id}=req.params;
    const{title,author}=req.body;

    const book=books.find(b => b.id === parseInt(id));

    if(!book){
        return res.status(404).json({message:'Book not found.'});
    }

    if(title) book.title=title;
    if(author) book.author=author;

    res.json(book);
});


//delete method 

app.delete('/books/:id',(req,res)=>{
    const{id}=req.params;
    const index=books.findIndex(b => b.id === parseInt(id));

    if(index===-1){
        return res.status(404).json({message:'Book not found.'});
    }


    books.splice(index,1);
    res.json({message:'Book deleted successfully.'})
});


app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
})
