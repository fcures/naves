import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

class SpecialPosts extends HTMLElement {
  connectedCallback(){

  const dirContents = fs.readdirSync('/posts/');

  dirContents;


    var fs = require('fs');
    var files = fs.readdirSync('/posts/');

    this.innerHTML = `<h3>`, files[1].Name,`</h3>`
  }
}

customElements.define('special-posts', SpecialPostsr)
