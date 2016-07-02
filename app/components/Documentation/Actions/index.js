import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';

export default function Actions() {
  return (
    <div>
      <Markdown filename="doc_actions.md" />
      <NextDocument name="operators" />
    </div>
  );
}
