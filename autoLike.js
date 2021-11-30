const axios = require('axios');
const uid = '';//Enter your uid here
const token = '';//Enter your token here

autoLike();

async function autoLike() {
    let list = await getFollowersList();
    for (let data of list) {
            let post = await getLatestPost(data.uid);
            if(post && !post.liked){
                let result = await likePost(post.id);
                if(result.code ===0){
                    console.log(`Liked post ID:${post.id} by ${post.uid}`) 
                }else{
                    console.log(`Error liking ${post.id}:${result.msg}`);

                }
            }
            await sleep(10000);
    }
}

function getFollowersList() {
    return new Promise(async (resolve, reject) => {
        axios.get(`https://api.monaconft.io/api/user/getFollowersList?uid=${uid}`, {
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

function getLatestPost(uid) {
    return new Promise(async (resolve, reject) => {
        axios.get(`https://api.monaconft.io/api/account/getPosts?uid=${uid}`, {
            headers: {
                token
            }
        }).then(result => {
            resolve(result.data.data[0])
        }).catch(err => {
            reject(err.response)
        })
    });
}


function likePost(postId) {
    return new Promise(async (resolve, reject) => {
        axios.post('https://api.monaconft.io/api/post/likePost', {
            post_id:postId
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