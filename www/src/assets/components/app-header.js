class AppHeader extends HTMLElement
{
    constructor()
    {
        super();
        
        //language=HTML
        this.innerHTML = `
            <nav>
                <ul>
                    <li>
                        <a href="/">Startseite</a>
                    </li>
                    <li>
                        <a href="/co2">CO2</a>
                    </li>
                    <li>
                        <a href="/feuchtigkeit">Feuchtigkeit</a>
                    </li>
                </ul>
            </nav>
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