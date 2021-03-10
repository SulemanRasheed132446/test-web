import React, { Component } from 'react'
import Pages from './router/Pages'
import "toasted-notes/src/styles.css"; 

export class App extends Component {    
    render() {
        return (
            <div>
                 <Pages />  
            </div>
        )
    }
}
