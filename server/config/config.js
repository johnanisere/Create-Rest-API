var _=require('lodash')
/*var config={
    env:process.env.NODE_ENV || 'development',
    logging:false,

    secrets:{
        smsapikey:"170de2d4b18892e18f8f14401f6c041f46e14d7d3b407444def26e2d4ee40165",
        username:"myBukka"
    }
}*/
//load up development.js ||
// testing.js ||
// production.js

var config = {
    dev:'development',
    test:'testing',
    prod:'production',
    port:process.env.PORT || 5000,
}
process.env.NODE_ENV=process.env.NODE_ENV || config.dev

config.env = process.env.NODE_ENV

var envConfig
try{
    envConfig=require('./'+config.env)
    envConfig=envConfig||{}
}catch(e){
    envConfig={}
}

//merge the two objects and export it so our app can use it
module.exports=_.merge(config, envConfig)