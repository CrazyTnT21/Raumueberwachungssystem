class AppHeader extends HTMLElement
{
    constructor()
    {
        super();

        //language=HTML
        this.innerHTML = `
            <style>
                header {
                    background-color: #333;
                    color: #fff;
                    padding: 20px;
                    text-align: center;
                }

                h1 {
                    margin: 0;
                    font-size: 36px;
                }

                ul {
                    list-style: none;
                    padding: 0;
                }

                li {
                    display: inline;
                    margin: 5px;
                }

                a {
                    color: #fff;
                    text-decoration: none;
                }

                li a {
                    font-size: 18px;
                }

                li a:hover {
                    color: #ccc;
                }
            </style>
            <header>
                <h1><a href="/">Raumüberwachungssystem</a></h1>
                <nav>
                    <ul>
                        <li><a href="/licht">Licht</a></li>
                        <li><a href="/temperatur">Temperatur</a></li>
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