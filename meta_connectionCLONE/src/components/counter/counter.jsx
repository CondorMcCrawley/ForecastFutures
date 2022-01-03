import React, { Component } from 'react';
import './Counter.css';

class Counter extends Component {

    state = { 
        count: 0,
        tags: []
    };
    styles = {
        fontSize: 24, 
        fontWeight: "bold"
    };

    handleIncrement = () => {
        console.log("Increment Clicked", this)
        this.setState({ count: this.state.count + 1 })
    };

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += this.state.count === 0 ? "warning" : "primary";
        return classes;
    }

    formatCount() {
        const { count } = this.state;
        return count === 0 ? 'Zero' : count;
    }

    renderTags() {
        if (this.state.tags.length === 0) return <p>CC</p>;

        return <ul>{this.state.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>;
    }

    render() {

        return (
        <div className="gpt3_header section padding" id="home">

            {this.renderTags()}
            <span style={{ fontSize: 24 }} className={this.getBadgeClasses()}>{ this.formatCount() }</span>  
            <button style={this.styles} className="btn btn-secondary btn-sm" onClick={this.handleIncrement}>Become a member</button>
            </div>  
        )
    }

}

export default Counter;