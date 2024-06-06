class SpecialPosts extends HTMLElement {
  connectedCallback(){

    var fs = require('fs');
    var files = fs.readdirSync('/posts/');

    this.innerHTML = files[1]
  }
}

customElements.define('special-posts', SpecialPostsr)
