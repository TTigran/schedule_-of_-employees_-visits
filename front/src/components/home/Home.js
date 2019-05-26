import React, { Component } from 'react';
import './Home.css';
class Home extends Component {
        state = {
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': [],
        '6': [],
        '7': [],
        '8': [],
        '9': [],
        persons: [],
        grafic: [],
        graficId: [],
        post: '',
        responseToPost: [],
        responseToPostAtt:[],
        response: ''
    }

    putUrl(b, n) {
        fetch(`http://localhost:5000/perso/${b}/${n}`)
            .then(res => res.json())
            .then((data) => {
                let a = {};
                a[b] = data;
                this.setState(a);

                console.log(this.state[b])
            })
            .catch(console.log())
    }

    api(count) {
        fetch('http://localhost:5000/api/person')
            .then(res => res.json())
            .then((data) => {
                this.setState({persons: data})

                var dataPerson = this.state.persons;
                for (let i = 0; i < dataPerson.length; i++) {

                    this.putUrl(dataPerson[i]['id'], count);
                }


            })
            .catch(console.log)
    }

    componentDidMount() {

        this.api(1)
        fetch('http://localhost:5000/grafic')
            .then(res => res.json())
            .then((data) => {
                this.setState({grafic: data})
                console.log(this.state.grafic);

            })
            .catch(console.log)


    }
    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/atten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({post: this.state.post}),
        });
        const body = await response.text();
        this.setState({responseToPost: body});
        console.log(this.state.responseToPost)
    };
    handleSubmitRigth = async e => {
        e.preventDefault();
        const response = await fetch('/api/rigth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({post: this.state.post}),
        });
        const body = await response.text();
        this.setState({responseToPost: body});
        this.api(this.state.responseToPost)
    };
    handleSubmitLeft = async e => {
        e.preventDefault();
        const response = await fetch('/api/left', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({post: this.state.post}),
        });
        const body = await response.text();
        this.setState({responseToPost: body});
        this.api(this.state.responseToPost)
    };

    render() {


        return (

            <div className="App">
                <header className="App-header">

                    <div id="left">
                        <form onSubmit={this.handleSubmit}>
                            <button type="submit">Attendance history</button>
                            <select onChange={e => this.setState({post: e.target.value})} value={this.state.post}>
                                {this.state.persons.map(item => (
                                    <option>{item.id}</option>
                                ))}
                            </select>
                        </form>
                    </div>
                    <div id="rigth">
                        <form onSubmit={this.handleSubmitRigth}>
                            <button type="submit">{'>'}</button>
                        </form>
                        <form onSubmit={this.handleSubmitLeft}>
                            <button type="submit">{'<'}</button>
                        </form>
                    </div>
                </header>
                <div>

                    <table>
                        <tr>
                            <td></td>
                            <td className='day'>Monday</td>
                            <td className='day'>Tuesday</td>
                            <td className='day'>Wednesday</td>
                            <td className='day'>Thursday</td>
                            <td className='day'>Friday</td>
                            <td className='day'>Saturday</td>
                            <td className='day'>Sunday</td>
                        </tr>
                        {this.state.persons.map(it => (
                            <tr><span className='name'>{it.id}.{' '}{it.firstname}{" "}{it.lastname} </span>
                                {this.state[it.id].map(item => (
                                    <td>{item.id} {" "} {item.from_time}{" "}{item.to_time}</td>
                                ))}
                            </tr>
                        ))}
                    </table>
                </div>

            </div>
        );
    }
}

export default Home






//
// class Home extends React.Component {
//

// }
//
// export default Home;