//importing modules
const bcrypt = require("bcrypt");
const User = require("../models/user_authentication");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { Pool } = require('pg');

const pool = new Pool({
  dialect: 'postgres',
  host: 'localhost',
  username: 'shubhamkumar',
  password: 'shubham123',
  database: 'shubhamkumar',
  port: 5432,
});

//signing a user up -> profile/signup
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
    try {
        const { user_name, email, password } = req.body;

        const data = {
            user_name,
            email,
            password: await bcrypt.hash(password, 10),
        };

        //saving the user
        const user = await User.create(data);

        /* if user details is captured generate token with the user's id and the secretKey in the env file set cookie with the token generated */
        if (user) {
            let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);

        //send users details
        return res.status(201).send(user);
        }
        else {
            return res.status(409).send("Details are not correct");
        }
    }
    catch (error) {
        console.log(error);
    }
};


//login authentication after profile signup
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //find a user by their email
        const user = await User.findOne({
            where: {
                email: email
            } 
     
        });

        //if user email is found, compare password with bcrypt
        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            //if password is the same generate token with the user's id and the secretKey in the env file
            if (isSame) {
                let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });

                //if password matches with the one in the database go ahead and generate a cookie for the user
                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                // console.log("user", JSON.stringify(user, null, 2));
                console.log(token);

                // login count query performed to get user login count
                const lgn_query = 'select login_count from user_credentials where user_id=$1';
                const values = [user.userid];
                const resp = await pool.query(lgn_query,values);
                const login_count = resp.rows[0].login_count
                const query = 'UPDATE user_credentials SET login_count =  $1 WHERE user_id=$2';
                const new_values = [login_count+1,user.userid];
                const result = await pool.query(query,new_values)
                //send user data
                return res.status(201).send(token);
            } 
            else {
                return res.status(401).send("Authentication failed");
            }
        }
        else {
            return res.status(401).send("Authentication failed");
        }
    }
    catch (error) {
        console.log(error);
    }
};

/*
// Logout function
const logout = (req, res) => {
    try {
      // Clear the JWT token on the client-side by setting its expiration to a past date
      res.cookie("jwt", "", { expires: new Date(0), httpOnly: true });
      
      // Optionally, clear any session data you might have on the server
      // For example, if you're using Express sessions:
      req.session.destroy();
      
      // Return a successful logout response
      res.status(200).send("Logout successful");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred during logout");
    }
  };
  */

 // Logout function
const logout = (req, res) => {
    try {
      // Check if a session exists before attempting to destroy it
      if (req.session) {
        // Destroy the session
        req.session.destroy((error) => {
          if (error) {
            console.error("Error destroying session:", error);
            res.status(500).send("An error occurred during logout");
          } else {
            // Clear the JWT token on the client-side by setting its expiration to a past date
            res.cookie("jwt", "", { expires: new Date(0), httpOnly: true });
            
            // Return a successful logout response
            res.status(200).send("Logout successful");
          }
        });
      } else {
        // If no session exists, still clear the JWT token
        res.cookie("jwt", "", { expires: new Date(0), httpOnly: true });
        
        // Return a successful logout response
        res.status(200).send("Logout successful");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred during logout");
    }
};
  

// Export the function
module.exports = {
    signup,
    login,
    logout
};