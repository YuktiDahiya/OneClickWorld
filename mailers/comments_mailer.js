const nodemailer= require('../config/nodemailer');




//this is another way of exporting a method
exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({comment: comment},'./comments/new_comment.ejs');

    console.log('inside new comment mailer');
    nodemailer.transporter.sendMail({
        from: 'yukti.dahiya76@gmail.com',
        to: comment.user.email,
        subject: "new comment published!",
        html: htmlString
    },(err, info) => {
        if(err){
            console.log('error in mail sending',err);
            return;
        }
        console.log('message sent',info);
        return;
    })
}