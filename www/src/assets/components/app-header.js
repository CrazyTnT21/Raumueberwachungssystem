class AppHeader extends HTMLElement
{
    constructor()
    {
        super();
        
        //language=HTML
        this.innerHTML = `

        <style>
        /* CSS-Styling für den Header */
        header {
          background-color: #333;
          color: #fff;
          padding: 20px;
          text-align: center;
        }
    
        /* Styling für den Titel im Header */
        h1 {
          margin: 0;
          font-size: 36px;
        }
    
        /* Styling für die Navigation im Header */
        nav ul {
          list-style: none;
          padding: 0;
        }
    
        nav ul li {
          display: inline;
          margin-right: 20px;
        }
    
        nav ul li a {
          color: #fff;
          text-decoration: none;
          font-size: 18px;
        }
    
        nav ul li a:hover {
          color: #ccc;
        }
      </style>
      <header>
        <h1>Raumüberwachungssystem</h1>
        <nav>
          <ul>
            <li><a href="/">Startseite</a></li>
            <li><a href="/CO2">CO2</a></li>
            <li><a href="/Feuchtigkeit">Feuchtigkeit</a></li>
            <li><a href="/Team">Team</a></li>
          </ul>
        </nav>
      </header>
        `;
    }

    connectedCallback()
    {

    }

    disconnectedCallback()
    {

    }
}

customElements.define("app-header", AppHeader);