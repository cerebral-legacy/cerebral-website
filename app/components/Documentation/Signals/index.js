import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';

export default function Signals() {
  return (
    <div>
      <Markdown filename="doc_signals.md" />
      <NextDocument name="actions" />
    </div>
  );
}
