const Post =require('../models/post');
const User = require('../models/users');
module.exports.home = async function(req, res){
    try{
        //populate the user of each post
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'

            }
        }).populate('likes');
        let users = await User.find({});
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users
        });
    }catch(err){
        console.log('error',err);
        return;
    }

       


}
