class SpecialHeader extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `
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
