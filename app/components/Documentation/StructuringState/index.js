import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';
import GithubCode from '../../GithubCode';

export default function StructuringState() {
  return (
    <div>
      <Markdown filename="doc_structuring_state.md" />
      <GithubCode url="https://github.com/cerebral/cerebral-website-tutorial-basic/blob/react/src/model.js" />
      <Markdown filename="doc_structuring_state2.md" />
      <NextDocument name="defining_signals" />
    </div>
  );
}
