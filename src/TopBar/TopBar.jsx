import React, { Component } from 'react';
import './TopBar.css';
import DetailBar from './DetailBar/DetailBar';
import SearchBar from './SearchBar/SearchBar';

class TopBar extends Component {
    constructor(){
        super();
        this.state={
            test:true
        }
    }

    changetest(){
        console.log('change');
        this.setState({
            test:!this.state.test
        })
    }

    render() {
        const showType=this.props.showType;
        if(showType==='book'||showType==='music'||showType==='movie'){
            return (
                <SearchBar setContents={this.props.setContents.bind(this)} setKeyword={this.props.setKeyword.bind(this)} keyword={this.props.keyword} count={this.props.count} showType={this.props.showType} id={this.props.id}/>
            );
        }else{
            return(
                <div onClick={this.changetest.bind(this)}>
                    <SearchBar setContents={this.props.setContents.bind(this)} setKeyword={this.props.setKeyword.bind(this)} keyword={this.props.keyword} count={this.props.count} showType={this.props.showType} id={this.props.id}/>
                    <DetailBar setShowType={this.props.setShowType.bind(this)} showType={this.props.showType}/>
                </div>
            )
        }
    }
    componentWillMount(){
        console.log('top bar will Mount');
    }
    componentDidMount() {
        console.log('top bar dit mount');
    }
}

module.exports = TopBar;


