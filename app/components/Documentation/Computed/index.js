import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';

export default function Computed() {
  return (
    <div>
      <Markdown filename="doc_computed.md" />
      <NextDocument name="context_providers" />
    </div>
  );
}
