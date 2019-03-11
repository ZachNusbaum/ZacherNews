import React from 'react';
import fetch from 'isomorphic-fetch';
import Error from 'next/error';

import StoryList from '../components/StoryList';

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
    if (stories.length === 0) {
      return <Error statusCode={503} />;
    } else {
      return (
        <div>
          <h1>Zacher News</h1>
          <StoryList stories={stories} />
        </div>
      );
    }
  }
}

export default Home;
