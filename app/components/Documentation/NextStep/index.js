import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';

export default function NextStep() {
  return (
    <div>
      <Markdown filename="doc_next_step.md" />
      <NextDocument name="adding_modules" />
    </div>
  );
}
