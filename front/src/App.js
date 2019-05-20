import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    state = {
        grafic1:[],
        persons: [],
        grafic: [],
        graficId:[],
        post : '',
        responseToPost:[],
        response:''
    }
    putUrl(b){
        fetch(`http://localhost:5000/perso/${b}`)
            .then(res => res.json())
            .then((data) => {
                let a = {};
                a[b] = data;
                this.setState(a);

                console.log(this.state[b])
            })
            .catch(console.log())
    }

    g(){
       console.log(this.state.persons)
    }


    componentDidMount() {

        fetch('http://localhost:5000/api/person')
            .then(res => res.json())
            .then((data) => {
                this.setState({persons: data})
                console.log(this.state.persons[0].firstname)
                this.state.name = this.state.persons[0].firstname
            })
            .catch(console.log)

        fetch('http://localhost:5000/grafic')
            .then(res => res.json())
            .then((data) => {
                this.setState({grafic: data})
                console.log(this.state.grafic)
            })
            .catch(console.log)

       this.g()






    }

    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/world', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: this.state.post }),
        });
        const body = await response.text();
        this.setState({ responseToPost: body });



    };



    render() {


        return (
            <div className="App">
                <header className="App-header">
                   <div id = "left">
                       <form onSubmit={this.handleSubmit}>
                           <button type="submit">Attendance history</button>

                           <select onChange={e => this.setState({ post: e.target.value })}  value={this.state.post} >
                               {this.state.persons.map(item => (
                                   <option >{item.id}</option>
                               ))}
                           </select>
                       </form>
                   </div>
                    <div id = "rigth">
                        <button>{'<'}</button> d1-d2 <button>{'>'}</button>
                    </div>
                </header>
                <div>

                    {this.state.persons.map(item => (
                        <div><span className='name'>{item.firstname}</span>
                            {this.state.grafic.map(item => (
                                <div>{item.from_time}

                                </div>
                            ))}
                        </div>
                    ))}

                </div>


            </div>
        );
    }
}

export default App;