import React, { Component } from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = {
            forecasts: [], loading: true
        };

    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderForecastsTable(forecasts) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Text</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.title}</td>
                            <td>{forecast.text}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderForecastsTable(this.state.forecasts);

        return (
            <div>
                <h1 id="tabelLabel" >История постов</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    //    получаем соответствующие куки
    accessCookie(cookieName) {
        var name = cookieName + "=";
        var allCookieArray = document.cookie.split(';');
        for (var i = 0; i < allCookieArray.length; i++) {
            var temp = allCookieArray[i].trim();
            if (temp.indexOf(name) == 0)
                return temp.substring(name.length, temp.length);
        }
        return "";
    }

    async populateWeatherData() {
        var nickname = this.accessCookie('mediumEditorWebNickname');
        var password = this.accessCookie('mediumEditorWebPassword');

        var data0 = new FormData();
        data0.append('nickname', nickname);
        data0.append('password', password);

        const response = await fetch('weatherforecast',
            {
                headers: {

                },
                method: "POST",
                body: data0

            });
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
}
