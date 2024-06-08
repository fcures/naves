import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

class SpecialPosts extends HTMLElement {
  connectedCallback(){

    var fs = require('fs');
    var files = fs.readdirSync('/posts/');

    this.innerHTML = const __filename = fileURLToPath(import.meta.url);
  }
}

customElements.define('special-posts', SpecialPostsr)
