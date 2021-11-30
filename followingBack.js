const axios = require('axios');
const uid = '';//Enter your uid here
const token = '';//Enter your token here
const INTERVAL= 1;//Runs every 1 minute
followingBack();
setInterval(() => {
    followingBack();
}, INTERVAL * 60 * 1000);
async function followingBack() {
    let list = await getFollowersList();
    for (let data of list) {
        if (data.follow == false) {
            let result = await follow(data.uid);
            if (result.code == 0) {
                console.log(`Followed ${data.uid}`)
            } else {
                console.log(`Error following ${data.uid}:${result.msg}`);
            }
            await sleep(10000);
        }
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
            reject(err)
        })
    });
}


function follow(uid) {
    return new Promise(async (resolve, reject) => {
        axios.post('https://api.monaconft.io/api/user/follow', {
            uid,
            type: 1
        }, {
            headers: {
                token
            }
        }).then(result => {
            resolve(result.data)
        }).catch(err => {
            reject(err)
        })
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}