import React from 'react';
import fetch from 'isomorphic-fetch';

class Home extends React.Component {
  static async getInitialProps() {
    let stories;

    try {
      const response = await fetch('https://node-hnapi.herokuapp.com/news?page=1');
      stories = await response.json();
    } catch (err) {
      console.error(err);
      stories = [];
    }

    return { stories };
  }

  render() {
    const { stories } = this.props;
    return (
      <div>
        <h1>Zacher News</h1>
        <div>
          {stories.map(story => (
            <h3 key={story.id}>{story.title}</h3>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
