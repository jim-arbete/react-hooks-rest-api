import React, { useState, useEffect } from 'react';
import './Movies.css';
import Table, { TableHead, TableRow, TableBody, TableCell } from '../Table/Table'

const API = 'http://hn.algolia.com/api/v1/search?query=redux';

type Hit = {objectID: string; title: string; author: string;}

const Movies = () => {

  const [data, setData] = useState<Hit[]>([]);
  
  useEffect(() => {

    (async () => {
      const result = await fetch(API);
      const data = await result.json();
      setData(data.hits);
    })();

  }, []);
  

  return (
    <>
            <h2>Listing movies</h2>    

      <Table>
        <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="justify">Title</TableCell>
              <TableCell align="right">Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data.map(row => (
            <TableRow key={row.objectID}>
              <TableCell>{row.objectID}</TableCell>
              <TableCell align="justify">{row.title}</TableCell>
              <TableCell align="right">{row.author}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* <pre>{ JSON.stringify(data, null, 2) }</pre> */}
    </>
  );
}

export default Movies;
