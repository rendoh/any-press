import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Paths } from '../../constants/paths';

const Home: FC = () => (
  <div>
    {Object.entries(Paths).map(([name, path]) => (
      <div key={name}>
        <Link to={path}>{name}</Link>
      </div>
    ))}
  </div>
);

export default Home;
