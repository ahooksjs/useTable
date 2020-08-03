import React from 'react';
import <%= name %> from '@ahooksjs/<%= pkgName %>';

const App = () => {
  const { state } = <%= name %>()
  return <div>Hello <%= name %> { state }</div>;
};

export default App;
