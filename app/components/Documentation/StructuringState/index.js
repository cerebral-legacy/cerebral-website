import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';

export default function GetStarted() {
  return (
    <div>
      <Markdown filename="doc_structuring_state.md" />
      <NextDocument name="adding_signals" />
    </div>
  );
}
