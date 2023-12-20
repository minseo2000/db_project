exports.getMovieurl = async function(movie_url){
    const video_url = "http://minseotest.iptime.org:50011/video/";
    for(let i = 0; i < movie_url.length; i++){
        movie_url[i].video_url = video_url + movie_url[i].video_url;
    }
    return movie_url;
};

exports.getMovieImage = async function(movie_img_url){
    const img_url = "http://minseotest.iptime.org:50011/image/";
    for(let i = 0; i < movie_img_url.length; i++){
        movie_img_url[i].video_img_url = img_url + movie_img_url[i].video_img_url;
    }
    return movie_img_url;
}

exports.getDate = async function(date){
    
    console.log(date[0].release_date);
    for(let i = 0; i < date.length; i++){
        date[i].release_date = date[i].release_date.toISOString();
        date[i].release_date = date[i].release_date.slice(0, 10);
    }
    
    return date;
}

exports.getProfileImage = async function(data){
    const img_url = "http://minseotest.iptime.org:50011/pro_image/";
    for(let i = 0; i < data.length; i++){
        data[i].profile_image_url = img_url + data[i].profile_image_url;
    }
    return data;
}