import logo from './images/github_logo.png';
import './App.css';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import Autocomplete from '@material-ui/lab/Autocomplete';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      repository_list: [],
      searchTerm: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (e) => { //function to handle the change in the typed text in search bar
    this.setState({searchTerm: e.target.value})
    axios.get(`https://api.github.com/repositories`)
      .then(res => { 
        const repository_list =  res.data.map(repo => 
        repo.full_name.includes(this.state.searchTerm) ? repo : null
        ).filter(c => c != null);
        this.setState(() => ({repository_list}));
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    const { repository_list } = this.state;
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TextField className="search_bar"  placeholder="Enter Repository Name" variant="outlined" onChange={this.handleInputChange} InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}/>
        { repository_list.length >= 1 ? 
            <List component="nav" aria-label="Suggestions" style={{width:"30%", paddingTop:"0px"}}>
              { repository_list.map(repository => (
                <Link key={repository.id} to={`/issueList/${repository.full_name}`}>
                  <ListItem style={{border:"ridge"}}>
                    <ListItemText primary={repository.name} />
                  </ListItem>
                </Link>
              ))
              }
            </List> : null  
        }
        {/* <Autocomplete
          id="combo-box-demo"
          options={this.state.repository_list}
          getOptionLabel={(option) => option.title}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Search Repository" variant="outlined"/>
         }
        /> */}
      </header>
    </div>
  );
  }
}

export default App;
