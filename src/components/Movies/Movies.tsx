import React, { useState, useEffect } from 'react'
import SearchInput, { SearchButton, SearchIconSVG }from '../Search/Search'
import Table, { TableHead, TableRow, TableBody, TableCell } from '../Table/Table'

// const API = 'http://hn.algolia.com/api/v1/search?query=redux';
const API = 'http://www.omdbapi.com/?apikey=1925addd&type=movie'

type SearchDataDTO = {imdbID: string; Title: string; Year: string;}

const Movies = () => {

  const [data, setData] = useState<SearchDataDTO[]>([])
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  
  useEffect(() => {

    (async () => {
      try {
        if (search.length > 2) {
          setData([]);
          setIsError(false)
          setIsLoading(true)
          const result = await fetch(`${API}&s=${search}`);
          const data = await result.json();
          setIsLoading(false)

          if (!result.ok) {
            setIsError(true)
            setData([]);
          } else if (data.Response === 'False' && result.ok) {
            // {Response: "False", Error: "Too many results."}
            setData([]);
          } else {
            if (data.Search.length >= 10) {
              setData(data.Search.slice(0,10));
            } else {
              setData(data.Search);
            }
          }
        } else {
          setData([]);
        }
      } catch(error) {
        console.error('D blev fel: ',error);
        setData([]);
        setIsLoading(false)
        setIsError(true)
      }
    })();
  }, [query]);

  const handleSubmit = (event:any) => {
    setQuery(search)
    event.preventDefault()
  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex search-wrapper">
          <SearchInput onChange={(event:any) => setSearch(event.target.value)} placeholder="Search titles on IMDB" />
          <SearchButton onClick={() => setQuery(search)}>
            <SearchIconSVG />
          </SearchButton>
        </div>
      </form>

      {isError && <p>Search failed ...</p>}
      {isLoading && <p>Loading ...</p>}
      { (data.length > 0 && !isLoading) ? (
        <>
          <h2>Listing movies<small>{Boolean(data.length) && `: found ${data.length} matches`}</small></h2>

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
      ) : !isLoading && !isError && search.length > 1 && <p>No result ...</p>}
    </>
  )
}

export default Movies
