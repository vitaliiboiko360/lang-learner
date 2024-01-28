import React from 'react';
import { Link } from 'react-router-dom';

import FirstPageOutlined from '@mui/icons-material/FirstPageOutlined';

export default function BackHomeButton() {
  return (
    <Link className={'btn btn-sm btn-back-home'} to="/">
      <span>
        <FirstPageOutlined />
        <span>Back Home</span>
      </span>
    </Link>
  );
}