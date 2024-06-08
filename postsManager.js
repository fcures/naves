import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

class SpecialPosts extends HTMLElement {
  connectedCallback(){

  const dirContents = fs.readdirSync('/posts/');

  dirContents;


    var fs = require('fs');
    var files = fs.readdirSync('/posts/');

    this.innerHTML = fileURLToPath(import.meta.url);
  }
}

customElements.define('special-posts', SpecialPostsr)
