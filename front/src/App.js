import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    state = {
        persons: [],
        grafic: []
    }

    componentDidMount() {

        fetch('http://localhost:5000/api/person')
            .then(res => res.json())
            .then((data) => {
                this.setState({persons: data})
                console.log(this.state.persons)
            })
            .catch(console.log)

        fetch('http://localhost:5000/grafic')
            .then(res => res.json())
            .then((data) => {
                this.setState({grafic: data})
                console.log(this.state.grafic)
            })
            .catch(console.log)


    }

    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/world', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/data-json',
            },
            body: JSON.stringify({post: this.state.post}),
        });
        const body = await response.text();
        this.setState({responseToPost: body});
    };

    render() {


        return (
            <div className="App">
                <header className="App-header">
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
                <p>{this.state.response}</p>
                {/*<form onSubmit={this.handleSubmit}>*/}
                {/*<p>*/}
                {/*<strong>Post to Server:</strong>*/}
                {/*</p>*/}
                {/*<input*/}
                {/*type="text"*/}
                {/*value={this.state.post}*/}
                {/*onChange={e => this.setState({ post: e.target.value })}*/}
                {/*/>*/}
                {/*<button type="submit">Submit</button>*/}
                {/*</form>*/}
                <p>{this.state.responseToPost}</p>
            </div>
        );
    }
}

export default App;