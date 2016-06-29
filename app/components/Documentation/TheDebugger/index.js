import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';

export default function TheDebugger() {
  return (
    <div>
      <Markdown filename="doc_the_debugger.md" />
      <NextDocument name="going_to_production" />
    </div>
  );
}
