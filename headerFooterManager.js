class SpecialMeta extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `

    <meta charset="UTF-8">
    <link rel="icon" type="image/x-icon" href="/favi.ico">
    <link rel="stylesheet" href="/styles.css">
    <title>Template</title>
  `
  }
}

class SpecialHeader extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `
    <button class="tablink"><a href = "/">Home</a></button>
    <button class="tablink"><a href = "/about">About Me</a></button>
    <button class="tablink"><a href = "/tools">Tools</a></button>
  `
  }
}

class SpecialFooter extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `
    <small>
      Naves.dev
    </small>

    <style>
  * {box-sizing: border-box}
  body {font-family: Verdana, sans-serif; margin:30px}
  </style>
  `
  }
}

customElements.define('special-meta', SpecialMeta)
customElements.define('special-header', SpecialHeader)
customElements.define('special-footer', SpecialFooter)
