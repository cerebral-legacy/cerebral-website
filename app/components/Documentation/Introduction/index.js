import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';

export default function Introduction() {
  return (
    <div>
      <Markdown filename="doc_introduction.md" />
      <NextDocument name="structuring_state" />
    </div>
  );
}
