import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';

@Cerebral({
  query: 'searchQuery',
  searchResults: 'searchResults',
  showSearchResult: 'showSearchResult'
})
class Search extends React.Component {
  search(query) {
    this.props.signals.searchQueryChanged({query});
  }
  render() {
    return (
      <li className="search">
        <i className="icon icon-search"/>
        <input className="search-input" value={this.props.query} onChange={(e) => this.search(e.target.value)}/>
        {
          this.props.showSearchResult ?
            <ul className="search-results">
              {
                this.props.searchResults.length ?
                  this.props.searchResults.map((result, index) => (
                    <li key={index} onClick={() => {
                      if (result.parent) {
                        this.props.signals.submenuClicked({
                          content: result.parent.replace(/\s/g, ''),
                          subContent: result.label.toLowerCase().replace(/\s/g, '')
                        });
                      } else {
                        this.props.signals.menuClicked({
                          content: result.label.toLowerCase().replace(/\s/g, '')
                        });
                      }
                    }}>
                      <strong>{result.label}</strong> ({result.hitsCount} hits)
                    </li>
                  ))
                :
                  <div className="search-no-results">No results</div>
              }
            </ul>
          :
            null
        }
      </li>
    );
  }
}

 export default Search;
