import React from 'react';
import './IssueList.css';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
// import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

class IssueList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      issues: [],
      name: this.props.match.params.name,
      repo: this.props.match.params.repo,
      openIssue: 0,
      closedIssues: 0,
      filteredByAssignee: [],
      filteredByAuthor: [],
      filteredByLabel: [],
      filteredBySort: [],
    };
    this.filteringByAssignee = this.filteringByAssignee.bind(this);
    this.filteringByAuthor = this.filteringByAuthor.bind(this);
    this.filteringByLabel = this.filteringByLabel.bind(this);
    this.filteringBySort = this.filteringBySort.bind(this);
  }

  componentDidMount(){
    //fetching issue of a repository
    axios.get(`https://api.github.com/repos/${this.state.name}/${this.state.repo}/issues`)
      .then(res => { 
        console.log(res.data);
        this.setState(() => ({issues: res.data}));
        res.data.map(issue => issue.state === "open" ? this.setState({openIssue: this.state.openIssue+1}) : this.setState({closedIssues: this.state.closedIssues+1}))
      })
      .catch(error => {
        console.log(error);
      })
  }

  filteringByAssignee(event){
    const filteredByAssignee = this.state.issues.map(issue => issue.assignee === event.target.value ? issue : null).filter(c => c != null);
    this.setState(() => ({filteredByAssignee}));

  }

  filteringByLabel(event){

  }

  filteringByAuthor(event){

  }

  filteringBySort(event){

  }

  render() {
    const { name, repo } = this.state;
    return (
      <React.Fragment>
        <header className="issueHeader">
          <h2 style={{width:"50%"}}>{name}/{repo}</h2>
          <div style={{width:"50%", textAlign:"end"}}>hey</div>
        </header>
        <div style={{width:"80%", margin:"0% 10%"}}>
          { this.state.issues.length > 0 ?
          <React.Fragment>
            <AppBar position="static" style={{background:"gainsboro"}}>
              <Toolbar>
                <Typography variant="h6" style={{color:"black"}}>
                  {this.state.openIssue} Open, {this.state.closedIssues} Closed
                </Typography>
                <div className="laptopViewFiltering">
                  <TextField className="filteringTextbox" placeholder="Author" variant="outlined" onChange={this.filteringByAuthor}/>
                  <TextField className="filteringTextbox" placeholder="Label" variant="outlined"/>
                  <TextField className="filteringTextbox" placeholder="Assignee" variant="outlined"/>
                  <TextField className="filteringTextbox" placeholder="Sort" variant="outlined"/>
                </div>
              </Toolbar>
            </AppBar>
            <List component="nav" aria-label="Issues" style={{padding:"0px auto"}}>
              {this.state.issues.map(issue => (
                <React.Fragment>
                  <ListItem style={{border:"ridge", display:"flex", flexDirection:"column", alignItems: "flex-start"}}>
                    <div className="listItem">
                      <ListItemText primary={issue.title} style={{height:"6vh"}}/>
                      <Chip label="type: Bug" style={{background: "red", marginTop:"1vh", marginLeft:"1vh"}}/>
                      <Chip label="status: confirmed" style={{background: "burlywood", marginTop:"1vh", marginLeft:"1vh"}}/>
                    </div>
                    <div className="listItem">
                      #{issue.id}
                    </div>
                  </ListItem>
                </React.Fragment>
              ))}
            </List> 
          </React.Fragment> : null }
        </div>
      </React.Fragment>
    )
  }
}

export default IssueList;
