var FB = require('fb');
var fs = require('fs');

async function getkey(){
FB.setAccessToken('EAAgoJZBnwBkwBAOuqyXSHbO53wvvumbSA3S0aFi0GCFPiJhscIZASbA5Gz6zfwKIZAVOQCOw83yee8pOueiypTNfaiOMA4YlmVxuxogWGnnkJYwt13iVO7la9sLsWe2kZCVHuFeSpTmD3DSxqQc2B5WgYtO85hZAW2xVvs01HZCwZDZD');
 }
 getkey();
 
// In an async function
async function example() {
    try {
        var response2 = await FB.api('101294701575372_145825923788916/comments?summary=total_count');
        const ob2 = JSON.stringify(response2)
        const obj2 = JSON.parse(ob2)
        const comments = obj2.summary.total_count
        var response = await FB.api('101294701575372_145825923788916/likes?summary=total_count');
        const ob1 = JSON.stringify(response)
        const obj = JSON.parse(ob1)
        const likes = obj.summary.total_count

        let rawdata = fs.readFileSync('Data.json');
        let Data = JSON.parse(rawdata);
        let savelikes = Data.Data[0].likes
        let savecomments = Data.Data[1].Comments
        console.log(savelikes)
        console.log(savecomments)

        if (likes != savelikes || comments != savecomments) {
            FB.api('', 'post', {
                batch: [{
                    method: 'post',
                    relative_url: '101294701575372_145825923788916',
                    body: 'message=' + 'โพสต์นี้มี' + '\n' + 'ถูกใจ = ' + likes + '\n' + 'คอมเม้น = ' + comments,
                }]
            }, function(res) {
                var res0;

                if (!res || res.error) {
                    console.log(!res ? 'error occurred' : res.error);
                    return;
                }

                res0 = JSON.parse(res[0].body);

                if (res0.error) {
                    console.log(res0.error);
                    FB.options({accessToken: 'EAAJ75VM31w0BAIeSAn1KgdBLp7sBZCaGP4JjTaiWr9mMBipX0ZBmJGbMqdDg1Rqi4lAZBWZBuqZCkoXWxyYJwwf0BIMTV3JZAet0emYl5hieuchqDF9dv8eqx5XWd2VXYKa4ZAYs6Vt7qCsHuEveWxXrmDGyae57fohaLa6lG7BeiS4AhcSCGDslvQmqTNAF5e7fD5q9005XgZDZD'});
                    example();
                } else {
                    var jsonData = '{"Data":[{"likes":"' + likes + '"},{"Comments":"' + comments + '"}]}';
                    // parse json
                    var jsonObj = JSON.parse(jsonData);
                    console.log(jsonObj);

                    // stringify JSON Object
                    var jsonContent = JSON.stringify(jsonObj);
                    console.log(jsonContent);

                    fs.writeFile("Data.json", jsonContent, 'utf8', function(err) {
                        if (err) {
                            console.log("An error occured while writing JSON Object to File.");
                            return console.log(err);
                        }

                        console.log("JSON file has been saved.");
                    });
                    console.log('Post Id: ' + res0.id);

                }

            });
        } else {
            console.log('เท่าเดิม')
        }
    } catch (error) {
        if (error.response.error.code === 'ETIMEDOUT') {
            console.log('request timeout');
        } else {
            console.log('error', error.message);

        }
    }
}

example();