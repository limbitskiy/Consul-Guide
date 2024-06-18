import { useState } from 'react';

function Page({ page }) {
  return (
    <div className="page" style={{ height: '100%' }}>
      <img
        src={page}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  );
}

export default Page;
