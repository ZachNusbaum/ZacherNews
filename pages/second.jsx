import React from 'react';
import Link from 'next/link';
const SecondPage = () => (
  <div>
    <h1>Second Page</h1>
    <Link href="/">
      <a>Home</a>
    </Link>
  </div>
);

export default SecondPage;
