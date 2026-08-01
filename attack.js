async function attack() {
    for(let i = 0; i<=1000000;i++) {
        const response = await fetch('http://localhost:3000/users')
        console.log(response)
        console.log('\n')
    }
}

attack()

// Rate-limiting

// 1 min --> user 

// 2 app wise 
// Path wise/Route wise 


// http://localhost:3000 --> BE, http://localhost:3002/signup --> FE
// http://localhost:3000 --> BE, http://localhost:3002/login --> FE
// http://localhost:3000 --> BE, https:amazon.in --> FE




// http://localhost:3000 --> BE, abc.https:amazon.in --> FE



// CORS -> Origin --> protocol(http) + domain(localhost) + port(3000, 3002)

// Different Origin/Cross Origin --> Not allowed. 
/*
abc.com(malicious) --> facebook (token), amazon.in (token)

cors(['http://localhost:3002','abc.com])

Ddos, Cors

DNS --> Domain Name Server (go daddy, AWS Route53, Azure) --> api.romir.com --> https://ec2.ca-central.32423.com:5002/


google.com --> DNS --> azure.com:900/jlkfajsd


XSS???
*/




// Domain and subdomain --> amazon.in, api.amazon.in


