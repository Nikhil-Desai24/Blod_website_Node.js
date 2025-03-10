




const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js')
const User = require('../models/User.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layout/admin'
const jwtSecret = process.env.JWT_SECRET;




/**
 * 
 * Admin - check login
*/
const authMiddleware = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token)
    {
        return res.status(401).json({message:'unauthorised'});
    }
    try{
        const decoded = jwt.verify(token,jwtSecret);
        req.userId = decoded.userId;
        next();
    }
    catch(error){
        res.status(401).json({message:'unauthorised'});
    }
}


/**
 * GET /
 * Admin - Login Page
*/




router.get('/admin', async (req, res) => {
    try {
      const locals = {
        title: "Admin",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      }
  
      res.render('admin/index', { locals, layout: adminLayout });
    } catch (error) {
      console.log(error);
    }
  });


/**
 * Post /
 * Admin - check Login
*/  






router.post('/admin', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await User.findOne( { username } );
  
      if(!user) {
        return res.status(401).json( { message: 'Invalid credentials' } );
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if(!isPasswordValid) {
        return res.status(401).json( { message: 'Invalid credentials' } );
      }
  
      const token = jwt.sign({ userId: user._id}, jwtSecret );
      res.cookie('token', token, { httpOnly: true });
      res.redirect('/dashboard');
  
    } catch (error) {
      console.log(error);
    }
  });

// get  admin dashboard 

router.get('/dashboard', authMiddleware, async (req, res) => {
    try {
      const locals = {
        title: 'Dashboard',
        description: 'Simple Blog created with NodeJs, Express & MongoDb.'
      }
  
      const data = await Post.find();
      res.render('admin/dashboard', {
        locals,
        data,
        layout: adminLayout
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });



  /**
 * Get /
 * Admin - reate new post
*/  

router.get('/add-post', authMiddleware, async (req, res) => {
    try {
      const locals = {
        title: 'Add Post',
        description: 'Simple Blog created with NodeJs, Express & MongoDb.'
      }
  
      const data = await Post.find();
      res.render('admin/add-post', {
        locals,
        layout: adminLayout
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });


//   * Post /
//   * Admin - create new post
//  */  
 
  router.post('/add-post', authMiddleware, async (req, res) => {
    try {
    //   console.log(req.body)
    // res.redirect('/dashboard');

    try {
        const newPost = new Post({
            title:req.body.title,
             body:req.body.body
        });

        await Post.create(newPost);
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
    }
    } catch (error) {
      console.log(error);
    }
  
  });



  

/**
 * Post /
 * Admin - Register Login
*/  

router.post('/register',async(req,res)=>{
    try {
        const {username, password} = req.body;
        const hashPassword = await bcrypt.hash(password,10);

        try {
            const user = await User.create({username, password:hashPassword});
            res.status(201).json({message:'User created',user});
        } catch (error) {
            if(error.code === 11000)
{
    res.status(409).json({message:'user already in use'});
}

res.status(500).json({message:'Internal server error'});
}
        
    } catch (error) {
        
    }
})



/**
 * Get/
 * Dashboard - Edit blog
*/  

router.get('/edit-post/:id', authMiddleware, async (req, res) => {
    try {
  
      const locals = {
        title: "Edit Post",
        description: "Free NodeJs User Management System",
      };
  
      const data = await Post.findOne({ _id: req.params.id });
  
      res.render('admin/edit-post', {
        locals,
        data,
        layout: adminLayout
      })
  
    } catch (error) {
      console.log(error);
    }
  
  });
/**
 * Put/
 * Dashboard - Edit blog
*/  

router.put('/edit-post/:id', authMiddleware, async (req, res) => {
    try {
  
      await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body,
        updatedAt: Date.now()
      });
  
      res.redirect(`/edit-post/${req.params.id}`);
  
    } catch (error) {
      console.log(error);
    }
  
  });


/**
 * Put/
 * ADMIN - Delete post
*/



router.delete('/delete-post/:id', authMiddleware, async (req, res) => {

    try {
      await Post.deleteOne( { _id: req.params.id } );
      res.redirect('/dashboard');
    } catch (error) {
      console.log(error);
    }
  
  });


  /**
 * Put/
 * ADMIN - Logout
*/


router.get('/logout',async(req,res)=>{
    res.clearCookie('token');
    // res.json({message:'logout successfull'});
    res.redirect('/');
    
})






module.exports = router;