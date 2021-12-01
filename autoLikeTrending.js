const axios = require('axios');
const token = '';//Enter your token here
const INTERVAL= 1;//Runs every 1 minute
const TAG = 'monaco';//Trending tag

autoLikeTrending();
setInterval(() => {
    autoLikeTrending();
}, INTERVAL * 60 * 1000);

async function autoLikeTrending() {
    let posts = await getTrendingPosts(TAG);
    for (let post of posts) {
        if (post && !post.liked) {
            let result = await likePost(post.id);
            if (result.code === 0) {
                console.log(`Liked post ID:${post.id} by ${post.uid}`)
            } else {
                console.log(`Error liking ${post.id}:${result.msg}`);
            }
            await sleep(10000);
        }
        
    }

}


function getTrendingPosts(topic) {
    return new Promise(async (resolve, reject) => {
        axios.get(`https://api.monaconft.io/api/post/getPostsByTopic?topic=${topic}`, {
            headers: {
                token
            }
        }).then(result => {
            resolve(result.data.data)
        }).catch(err => {
            reject(err.response)
        })
    });
}


function likePost(postId) {
    return new Promise(async (resolve, reject) => {
        axios.post('https://api.monaconft.io/api/post/likePost', {
            post_id: postId
        }, {
            headers: {
                token
            }
        }).then(result => {
            resolve(result.data)
        }).catch(err => {
            reject(err.response)
        })
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}