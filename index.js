const express=require('express');
const cluster=require('cluster');
const {cpus}=require('os');
const winston = require('winston');
const app=express();

const PORT=parseInt(process.argv[2])||8080;
const modoCluster=process.argv[3]=="CLUSTER";

const logger = winston.createLogger({
    level: 'warn',
    transports : [
        new winston.transports.Console({ level:'verbose' }),
        new winston.transports.File({ filename: 'info.log', level:'error' }),
    ]
    })


function isPrime(num) {
    if ([2, 3].includes(num)) return true;
    else if ([2, 3].some(n => num % n == 0)) return false;
    else {
        let i = 5, w = 2;
        while ((i ** 2) <= num) {
            if (num % i == 0) return false
            i += w
            w = 6 - w
        }
    }
    return true
 }
 


if(modoCluster && cluster.isMaster){
    const numCpus={cpus}.lenght;

    for(let i=0;i<numCpus;i++){
        cluster.fork();
    }
}else{
    app.get('/',(req,res)=>{
        const primos=[]

        const max=Number(req.query.max)||1000;
        for(let i=1;i<=max;i++){
            if(isPrime[i])primos.push(i);
        }

    })
}


app.listen(PORT,()=>{
   
    
logger.info(`Listening on ${PORT}`);
logger.info(`PID WORKR ${process.pid}`);

})