





const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js')
const { isActiveRoute } = require('../helpers/routeHelpers');


// Routes
// get method
// this is home page-> index
router.get('', async (req, res) => {
  try {
      const locals = {
          title: "NodeJs Blog",
          description: "Simple Blog created with NodeJs, Express & MongoDb.",
          currentRoute: '/',
          isActiveRoute  // Pass function to EJS
      };

      let perPage = 5;
      let page = req.query.page || 1;

      const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
          .skip(perPage * page - perPage)
          .limit(perPage)
          .exec();

      const count = await Post.countDocuments({});
      const nextPage = parseInt(page) + 1;
      const hasNextPage = nextPage <= Math.ceil(count / perPage);

      res.render('index', {
          locals,
          data,
          current: page,
          nextPage: hasNextPage ? nextPage : null
      });
  } catch (error) {
      console.log(error);
  }
});

// router.get('',async(req,res)=>{
//     const locals = {
//         title: 'Blog App',
//         description:'This is blog website build using Nodejs Bitch '
//     }
//     try{
//     const data = await Post.find({});
//     res.render('layout/index',{data,locals})
//     }

//     catch(err){
//         console.log('error:',err)
//     }
//     // res.render('layout/index',{locals})
// });
// // insertPostData();

router.get('/post/:id', async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await Post.findById(slug);

    if (!data) {
      return res.status(404).render('404', { message: 'Post not found' });
    }

    const isActiveRoute = (route, currentRoute) => (route === currentRoute ? 'active' : '');

    const locals = {
      title: data.title,
      description: 'This is a blog website built using Node.js',
      currentRoute: `/post/${slug}`,
      isActiveRoute, // Pass function to EJS
    };

    res.render('post', { data, locals });
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).render('500', { message: 'Internal Server Error' });
  }
});

// post route -> post searchTerm


router.post('/search',async(req,res)=>{
  try {
    const locals = {
      title: 'Search',
      description:'This is blog website build using Nodejs Bitch'
    }

    let searchTerm = req.body.searchTerm
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

    const data = await Post.find({
      $or: [
        {title:{$regex: new RegExp(searchNoSpecialChar,'i')}},
        {body:{$regex: new RegExp(searchNoSpecialChar,'i')}}
      ]
    }); 
    res.render('search',{locals,data})
  } catch (error) {
    console.error('error:', err);
    // res.render('index', { locals,data });
  }
})




router.get('/about', (req, res) => {
  res.render('about', {
    // currentRoute: '/about'
  });
});
//  contact route
router.get('/contact',(req,res)=>{
    res.render('contact',{
      // currentRoute:'/contact'
    });
});

module.exports = router;


// get route /post




// function insertPostData() {
//     Post.insertMany([
//         {
//             title:'Building a Blog',
//             body:'This is the body text',
//         },
//         {
//           title: "Deployment of Node.js applications",
//           body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
//         },
//         {
//           title: "Authentication and Authorization in Node.js",
//           body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
//         },
//         {
//           title: "Understand how to work with MongoDB and Mongoose",
//           body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
//         },
//         {
//           title: "build real-time, event-driven applications in Node.js",
//           body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
//         },
//         {
//           title: "Discover how to use Express.js",
//           body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
//         },
//         {
//           title: "Asynchronous Programming with Node.js",
//           body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
//         },
//         {
//           title: "Learn the basics of Node.js and its architecture",
//           body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
//         },
//         {
//           title: "NodeJs Limiting Network Traffic",
//           body: "Learn how to limit netowrk traffic."
//         },
//         {
//           title: "Learn Morgan - HTTP Request logger for NodeJs",
//           body: "Learn Morgan."
//         },
//     ])
// }