# calculator-web-app

#### Before we begin…

All the following instructions assume you are using a Linux machine. To download the files from Github, make sure you have git installed on your computer. Then run the following command:  
`$ git clone https://github.com/theonenottaken/calculator-web-app`  
Now all the files from the github repository should be in a single directory on your computer.

#### Installing Some Prerequisites

These prerequisites are needed to run each component of the project on its own. To run all of the microservices in a docker environemnt, however, you ideally should be able to skip down to
the bottom step "Running a Docker Environment with All of the Microservices". I'm afraid though that I'm still learning docker and this step might not work on its own. If I figure this out,
I will update the repository and this README file. In the meantime, the instructions as given should work to run each component of the project.

You’ll need node.js installed. If not already installed, you should also install npm – node’s package manager. Run the following commands:

`$ sudo apt-­get update`  
`$ sudo apt­-get install nodejs`  
`$ sudo apt­-get install npm`  

In addition, the server requires use of Express and body-parser. To install, `cd` to the directory in which the server.js file resides (the directory that holds all the files you downloaded
from Github) and run these commands:

`$ npm install express –save`  
`$ npm install body-­parser`  

Next, install Docker by running these commands:

`$ curl ­-fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-­key  add -`<br/>
`$ sudo add­-apt-­repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release ­cs) stable"`  
`$ sudo apt-­get update`  
`$ sudo apt-­cache policy docker­-ce`  
`$ sudo apt-­get install -­y docker-­ce`  

Finally, install docker-compose with:

`$ sudo apt install docker-­compose`  
`$ sudo apt-­get update`  

#### Running the Unit Tests

`cd` to the directory with the relevant code files and run this command:

`$ node unit_test.js`

#### Running Just the Web Server

Run this command:
`$ node server.js`

You should see a “listening...” message in the output, indicating that the server is running and waiting for requests. You can now open a separate terminal and manually send requests to the
server using ‘curl’. An example curl command is the following:  
`$ curl http://localhost:5000/calculate -­X POST -­H 'content-­type:application/json' -d '{"calculatorState": null, "input": "1"}'`  
The output returned from the server will be a JSON object representing the next state of the calculator. You can use this object as the input of your next request. Note that the server
listens on port 5000.

#### Running the Integration Tests

This is simple at this point. `cd` to the directory containing the relevant code files and run this command:  
`$ node it_test.js`  
(This assumes you have the web server running already.)

#### Running the Web Server in a Docker Container 

To run the calculator web server in a docker container, run this command:  
`$ sudo docker run -­t -­p 5000:5000 calculate`  
You should see the “listening...” message again.

#### Running a Docker Environment with All of the Microservices

First, build the calculator server with:  
`$ sudo docker­-compose build calculate`  
Then run all the microservices together with:  
`$ sudo docker-­compose up`  
You can now open a web browser and surf to http://localhost:3000/login. Log in or sign up and you can use the graphical calculator on the next page.
