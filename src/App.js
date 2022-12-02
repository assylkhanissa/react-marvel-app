import './App.css';
import Header from './components/Header'
import CharacterTable from './components/CharacterTable'
import axios from 'axios'
import React , {useEffect,useState} from 'react'
import Search from './components/Search'

const hash =  "4e9f36d51ed3fd335af31dd3abcfffa6"

function App() {
  const[items,setItems] = useState([])
  const[isLoading,setLoading] = useState(true)
  const [query,setQuery] = useState('')

  useEffect(()=>{
    const fetch = async()=>{
      if(query===''){
          const result = await axios(`http://gateway.marvel.com/v1/public/characters?ts=1&apikey=ebfe89be81965aba6d81f436406849d4&hash=${hash}`)
          console.log(result.data.data.results)
          setItems(result.data.data.results)
          setLoading(false)
        }


      else{
        const result = await axios(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=ebfe89be81965aba6d81f436406849d4&hash=${hash}`)
        console.log(result.data.data.results)
        setItems(result.data.data.results)
        setLoading(false)
      }

    }

    fetch()
  },[query])

  return (
      <div className="container">
        <Header />
        <Search search={(q)=>setQuery(q)}></Search>
        <CharacterTable items={items} isLoading={isLoading} />
      </div>
  );
}

export default App;