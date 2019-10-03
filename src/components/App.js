import React from "react";
import { Item } from "./Item";

export class App extends React.Component {
  constructor() {
    super();
    this.state={
      items: [],
      isLoading: false,
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch('https://www.reddit.com/r/reactjs.json?limit=100')
    .then((response) => response.json())
    .then( ({data}) => {
      this.setState({ 
        items: data.children,
        isLoading: false
       });
    } );
  }

  updateAutoRefresh = () => {

  } 

  render() {

    const {items, isLoading} = this.state;
    const itemsSortByComments = items.sort( 
      (a,b) => b.data.num_comments - a.data.num_comments
    );
    return (
      <div>
        <h1>Top Commented</h1>
        <button 
          type="button"
          onClick={this.updateAutoRefresh}
          style={{
            marginBottom: '15px'
          }}
        >
          Start AutoRefresh
        </button>
        { isLoading ? <p>...Loading</p> : (
          itemsSortByComments.map(
            item => <Item key={item.data.id} data={item.data} /> 
          )
        )}
      </div>
    )
  }
}
