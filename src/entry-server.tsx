import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './App';

export function render(): string {
  return renderToString(React.createElement(App));
}
