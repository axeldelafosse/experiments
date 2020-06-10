import React, { useEffect } from 'react';

import { setCookie } from '../../utils/cookies';

function SaveExperiments({ experiments }: any) {
  const X = JSON.stringify(experiments);

  useEffect(() => {
    setCookie(X, 'X');
  }, [X]);

  return <noscript />;
}

export default SaveExperiments;
