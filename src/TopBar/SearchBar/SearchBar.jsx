import React, {Component} from 'react';
import './SearchBar.css';
import fetchJsonp from 'fetch-jsonp'

class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            flag:''
        }
    }
//请求数据
    search() {
        const src = this.setSrc()
        this.getData(src)
    }

//根据keyword,showType,count,id设置请求数据的src
    setSrc() {
        const showType = this.props.showType
        console.log('showType',showType);
        const count = this.props.count
        const id = this.props.id
        const keyword = this.props.keyword
        let src
        // console.log('keyword', keyword);
        switch (showType) {
            case 'book':
                if (keyword === '') {
                    src = `https://api.douban.com/v2/book/search?q=建筑&count=${count}&fields=author,images,summary,title,tags,rating,pubdate,id`
                } else {
                    src = `https://api.douban.com/v2/book/search?q=${keyword}&count=${count}&fields=author,images,summary,title,tags,rating,pubdate,id`
                }
                break
            case 'bookDetail':
                src = `https://api.douban.com/v2/book/${id}`
                break

            case 'movie':
                if (keyword === '') {
                    // console.log(keyword)
                    src = `https://api.douban.com/v2/movie/top250?count=${count}`
                } else {
                    src = `https://api.douban.com/v2/movie/search?q=${keyword}&count=${count}&fields=author,images,summary,title,tags,rating,pubdate,id`
                }
                break
            case 'movieDetail':
                src = `https://api.douban.com/v2/movie/${id}`
                break
            case 'music':
                if (keyword === '') {
                    src = `https://api.douban.com/v2/music/search?q=流行&count=${count}&fields=author,images,summary,title,tags,rating,pubdate,id`
                } else {
                    src = `https://api.douban.com/v2/music/search?q=${keyword}&count=${count}&fields=author,images,summary,title,tags,rating,pubdate,id`
                }
                break
            case 'musicDetail':
                src = `https://api.douban.com/v2/music/${id}`
                break
            default:
                break
        }
        // console.log('src', src);
        return src
    }

//根据showType设置placeHolder显示的内容
    setPlaceHolder() {
        let showType = this.props.showType
        let pageHolder
        switch (showType) {
            case 'book':
                pageHolder = '书名、作者、ISBN'
                break
            case 'movie':
                pageHolder = '电影、影人、导演'
                break
            case 'music':
                pageHolder = '歌手、唱片名、条码'
                break
            default:
                break
        }
        return pageHolder
    }

//点击搜索设置keyword触发渲染
    returnKeyword() {
        let keyword = ''
        let input = document.getElementsByTagName('input')[0]
        if (input) {
            keyword = input.value
        }
        if (keyword !== '') {
            this.props.setKeyword(keyword)
        }
    }

// 通过src获取数据,并通过setContents返回给app.jsx
    getData(src) {
        let self = this
        fetchJsonp(src)
            .then(function (response) {
                return response.json()
            }).then(function (json) {
            console.log('json原始数据',json);
            self.props.setContents(json)
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }
    render() {
        console.log('SearchBarflaf',this.props.id,this.props.showType,this.props.count,this.props.keyword);
        if(this.state.flag!==this.props.id+this.props.showType+this.props.count+this.props.keyword){
            this.state.flag=this.props.id+this.props.showType+this.props.count+this.props.keyword;
            this.search();
        }
        let containerClassName='searchBarContain';
        const testWord=/Detail/;
        if(testWord.test(this.props.showType)){
            containerClassName='hideBar'
        }
        const placeHolder = this.setPlaceHolder()
        return (
            <div className={containerClassName}>
                <div className='searchBar'>
                    <i className='searchBar-iconfont' id='glass'>&#xe6d0;</i>
                    <input type='search' ref={(input) => this.input = input}
                           placeholder={placeHolder}/>
                    <a onClick={this.returnKeyword.bind(this)}>搜索</a>
                </div>
            </div>
        );
    }

    componentWillUpdate() {
        // this.search();
    }

    componentDidMount() {
        // this.search();
        // console.log('DidMount_search');
        const input = this.input
        input.focus()
    }
}

module.exports = SearchBar;

