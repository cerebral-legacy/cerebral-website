import React from 'react';

import Markdown from '../../Markdown';
import GithubCode from '../../GithubCode';
import NextDocument from '../../NextDocument';

export default function GetStarted() {
  return (
    <div>
      <Markdown filename="doc_get_started.md" />
      <NextDocument name="structuring_state" />
    </div>
  );
}
