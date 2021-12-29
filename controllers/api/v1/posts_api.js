const Post= require('../../../models/post');
const Comment= require('../../../models/comment');
module.exports.index =  async function(req,res){
    let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    return res.json(200,{
        message: "list os posts",
        posts: posts
    })
}

module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});

           /*if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }*/

            //req.flash('success', 'Post and associated comments deleted!');

            return res.json(200,{
                message:"post and associated comments deleted successfully" 
            });
        }else{
            return res.json(401,{
                message: "you cannot delete this post!"
            });
        }

    }catch(err){
        return res.json(500,{
            message: "server error"
        });
    }
    
}
