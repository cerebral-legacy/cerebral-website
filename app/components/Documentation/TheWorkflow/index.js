import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';

export default function TheWorkflow() {
  return (
    <div>
      <Markdown filename="doc_the_workflow.md" />
      <NextDocument name="choosing_a_model" />
    </div>
  );
}
