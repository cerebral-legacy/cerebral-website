import React from 'react';

import Markdown from '../../Markdown';
import NextDocument from '../../NextDocument';

export default function GetStarted() {
  return (
    <div>
      <Markdown filename="doc_choosing_a_project_type.md" />
      <NextDocument name="choosing_a_model" />
    </div>
  );
}
