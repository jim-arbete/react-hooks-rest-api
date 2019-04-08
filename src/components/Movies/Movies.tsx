import React, { useState, useEffect } from 'react'
import SearchInput, { SearchButton, SearchIconSVG }from '../Search/Search'
import Table, { TableHead, TableRow, TableBody, TableCell } from '../Table/Table'

// const API = 'http://hn.algolia.com/api/v1/search?query=redux';
const API = 'http://www.omdbapi.com/?apikey=1925addd&type=movie'

type SearchDataDTO = {imdbID: string; Title: string; Year: string;}

const Movies = () => {

  const [data, setData] = useState<SearchDataDTO[]>([])
  const [search, setSearch] = useState<string>('')
  
  useEffect(() => {

    // ADD DEBOUNCE => https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
    (async () => {
      try {
        if (search.length > 2) {
          const result = await fetch(`${API}&s=${search}`);
          const data = await result.json();
          setData(data.Search.slice(0,10));
        } else {
          console.error('to few chars');
        }
      } catch(error) {
        console.error(error);
      }
    })();

  }, [search]);
  
  // return <pre>{ JSON.stringify(data, null, 2) }</pre>

  return (
    <>
      <div className="flex search-wrapper">
        <SearchInput onSearchChange={setSearch} placeholder="Search titles on IMDB" />
        <SearchButton>
          <SearchIconSVG />
        </SearchButton>
      </div>

      <h2>Listing movies<small>{data.length && `: found ${data.length} matches`}</small> </h2>
      <Table>
        <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="right">Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data.map(row => (
            <a key={row.imdbID} href={`http://www.imdb.com/title/${row.imdbID}`} target="_blank">
              <TableRow>
                <TableCell>{row.imdbID}</TableCell>
                <TableCell>{row.Title}</TableCell>
                <TableCell align="right">{row.Year}</TableCell>
              </TableRow>
            </a>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Movies;
