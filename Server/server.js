const express = require('express');
const os = require('os');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./User');

const port = 4000;

mongoose.connect('mongodb+srv://23010101116:meet1447@cluster01.pnf0b.mongodb.net/Users').then(()=>{

    console.log('connected');

    const app = express();
    

    app.use(cors());
  

    app.use(express.json());


    app.get('/users' , async(req, res)=>{
        const data = await User.find();
        res.send(data);
    });


    app.get('/user/:id' , async(req, res)=>{
        const user = await User.findOne({_id : req.params.id});
        res.send(user);
    });



    app.get('/userLogin/:userName/:password' , async(req, res)=>{
        const user = await User.findOne({userName : req.params.userName});
        if(user == null || user == undefined) res.send('NotFound');
        else if(user.password == req.params.password) res.send(`${user._id}`);
        else res.send('NotFound');
    });



    app.post('/userhistory/:id' , async(req, res)=>{
        const user = await User.findOne({_id : req.params.id});
        const data = {...req.body};
        
        if(user.history.length != 0 && user.history[user.history.length - 1].date === data.date){
            let old = user.history.pop();
            data.salesAmount += old.salesAmount;
            data.purchaseAmount += old.purchaseAmount;
        }
       
        user.history.push(data);

        const ans = await user.save();
        res.send(ans);
    });

    app.post('/user' , async(req, res)=>{
        const newUser = new User({...req.body});

        const oldUser = await User.findOne({userName : newUser.userName});

        if(oldUser){
            res.send('Username is unavailable');
        }
        else{
            const ans = await newUser.save();
            res.send('User Added');
        }
    });




    app.patch('/user/:id', async(req, res)=>{
        const user = await User.findOne({
            _id : req.params.id
        });

        Object.assign(user, req.body);

        const ans = await user.save();
        res.send(ans);
    });




    app.delete('/user/:id', async(req, res)=>{
        const ans = await User.deleteOne({_id : req.params.id});
        if(ans) res.send('Deleted');
        else res.send("Can't find");
    });




    app.listen(port , () => {
        console.log('Server started at ' + port + ' port');
    });
});











// Get the network interfaces
const networkInterfaces = os.networkInterfaces();

// Loop through network interfaces and find IPv4 addresses
for (const interfaceName in networkInterfaces) {
    const addresses = networkInterfaces[interfaceName];

    for (const addressInfo of addresses) {

        if (addressInfo.family === 'IPv4' && !addressInfo.internal) {

            const string = `export const apiBaseUrl = 'http://${addressInfo.address}:${port}';\n`; 

            fs.writeFile('../reactapp/src/apiBaseUrl.js', string, 'utf8', (err) => {
                if (err) throw err;
            });

        }
    }
}