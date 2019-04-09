import React, { useState, useEffect } from 'react'
import SearchInput, { SearchButton, SearchIconSVG }from '../Search/Search'
import Table, { TableHead, TableRow, TableBody, TableCell } from '../Table/Table'

const API = 'http://www.omdbapi.com/?apikey=1925addd&type=movie'

type SearchDataDTO = {imdbID: string; Title: string; Year: string;}

const Movies = () => {

  const [data, setData] = useState<SearchDataDTO[]>([])
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')
  const [sortID, setSortID] = useState('') // 'ID' | 'Title' | 'Year'
  const [sortDirection, setSortDirection] = useState('') // 'asc' | 'desc'
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

  const handleSortClick = (sort: string, id: string) => {
    let direction
    if (sortDirection === 'asc' && id === sortID) {
      direction = 'desc'
    } else if (sortDirection === 'desc') {
      direction = 'asc'
    } else {
      direction = (sortDirection === '') ? 'asc' : 'asc'
    }
    setSortDirection(direction)
    setSortID(id)
  }

  const handleSortDirection = (id: string) => (id === sortID) ? sortDirection : ''

  const sortFunction = (key: string, order: string = 'asc') => {
    return function(a: any, b: any) {

      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const compareA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key]
      const compareB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key]
      
      let comparison = 0

      if (compareA > compareB) {
        comparison = 1
      } else if (compareA < compareB) {
        comparison = -1
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      )
    }
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
                  <TableCell className="sortable" onSortClick={handleSortClick} sortKey="Title" sortDirection={handleSortDirection('Title')}>Title</TableCell>
                  <TableCell className="sortable" onSortClick={handleSortClick} sortKey="Year" sortDirection={handleSortDirection('Year')} align="right">Year</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {data.sort(sortFunction(sortID, sortDirection)).map(row => (
                <a key={row.imdbID} href={`http://www.imdb.com/title/${row.imdbID}`} target="_blank">
                  <TableRow>
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
