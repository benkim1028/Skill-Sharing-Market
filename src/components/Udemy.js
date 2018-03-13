import _ from 'lodash';
import React from 'react';
import SearchBar from './Udemy/search_bar';
import VideoList from './Udemy/video_list';
import VideoDetail from './Udemy/video_detail';
import YTSearch from 'youtube-api-search';

const API_KEY = "AIzaSyB5eD_wWeBBi44frbGcMy6B6rzZYR96CUY";



class Udemy extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            selectedVideo: null,
            videos: []
        };

        this.videoSearch('benkim');
    }

    videoSearch(term){
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render(){
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

        return(
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}
                />
            </div>

        )
    }
}

export default Udemy;