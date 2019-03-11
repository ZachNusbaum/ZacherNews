import React from 'react';
import fetch from 'isomorphic-fetch';
import Error from 'next/error';

import Layout from '../components/Layout';
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
        <Layout>
          <StoryList stories={stories} />
        </Layout>
      );
    }
  }
}

export default Home;
