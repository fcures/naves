class SpecialHeader extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `

    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="stylesheet" href="/styles.css">
    <title>Template</title>
    
    <style>
body {
  background-color:white;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #38444d;
}

li {
  float: left;
}

li a, .dropbtn {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover, .dropdown:hover .dropbtn {
  background-color: DodgerBlue;
}

li.dropdown {
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {background-color: #f1f1f1;}

.dropdown:hover .dropdown-content {
  display: block;
}

img {
    padding: 5px;
    width: 45px;
}
</style>
</head>
<body>

<ul>
  <li><img src="/favicon.ico" alt="naves icon"/>
  <li><a href="/">Home</a></li>

  <li><a href="/posts">Posts</a></li>
  
  <li class="dropdown">
    <a href="/tools" class="dropbtn">Tools</a>
    <div class="dropdown-content">
      <a href="/tools/weightconverter">Weight Converter</a>
      <a href="/tools/temperatureconverter">Temperature Converter</a>
      <a href="/tools/lengthconverter">Length Converter</a>
      <a href="/tools/speedconverter">Speed Converter</a>
    </div>
  </li>
  
  <li style="float:right"><a class="active" href="/about">About</a></li>
</ul>
<br>
<br>

  `
  }
}

class SpecialFooter extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `
    <br>
    <small>
      naves.dev
    </small>

    <style>
  * {box-sizing: border-box}
  body {font-family: Verdana, sans-serif; margin:30px}
  </style>
  `
  }
}

customElements.define('special-header', SpecialHeader)
customElements.define('special-footer', SpecialFooter)
