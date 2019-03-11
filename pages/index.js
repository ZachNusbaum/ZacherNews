import React from 'react';
import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import Link from 'next/link';
import Layout from '../components/Layout';
import StoryList from '../components/StoryList';

class Home extends React.Component {
  static async getInitialProps({ req, res, query }) {
    let stories;
    let page;

    try {
      page = Number(query.page) || 1;

      const response = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`);
      stories = await response.json();
    } catch (err) {
      console.error(err);
      stories = [];
    }

    return { page, stories };
  }

  render() {
    const { stories, page } = this.props;

    if (stories.length === 0) {
      return <Error statusCode={503} />;
    } else {
      return (
        <Layout title="Zacher News">
          <StoryList stories={stories} />
          <button>
            <Link href={`/?page=${page + 1}`}>
              <a>Load More</a>
            </Link>
          </button>

          {page > 1 && (
            <button>
              <Link href={`/?page=${page - 1}`}>
                <a>Previous</a>
              </Link>
            </button>
          )}
        </Layout>
      );
    }
  }
}

export default Home;
