import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';

export default function Universal() {
  return (
    <div>
      <Markdown filename="doc_universal.md" />
      <NextDocument name="modules" />
    </div>
  );
}
