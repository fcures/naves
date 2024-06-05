class SpecialHeader extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `

    <meta charset="UTF-8">
    <link rel="icon" type="image/x-icon" href="./favi.ico">
    <link rel="stylesheet" href="/styles.css">
    <title>Sevan's Portfolio</title>
    
    <button class="tablink"><a href = "/">Home</a></button>
    <button class="tablink"><a href = "/about">About Me</a></button>
  `
  }
}

class SpecialFooter extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `
    <p>
      Naves.dev
    </p>
  `
  }
}

customElements.define('special-header', SpecialHeader)
customElements.define('special-footer', SpecialFooter)
