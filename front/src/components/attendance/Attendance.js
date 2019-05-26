import React, { Component } from 'react';
import './Attendance.css'
class Attendance extends Component {
    state={
        persons:[],
        graficId: [],
        responseToPost:[],
        post:[],
        response:[],
        data:[]
    }
    componentDidMount() {
        fetch('http://localhost:5000/api/person')
            .then(res => res.json())
            .then((data) => {
                this.setState({persons: data})

            })
            .catch(console.log)

        fetch('http://localhost:5000/api/atten')
            .then(res => res.json())
            .then((data) => {
                this.setState({graficId: data})
                console.log(this.state.graficId);

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
  this.state.data = <div>
      {this.state.responseToPost.map(item => (
          <p>{item.id}</p>
      ))}
  </div>
    };
    render() {
        return (

            <div>

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
            </div>
        );
    }
}

export default Attendance;