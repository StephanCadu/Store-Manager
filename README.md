# Store Manager Project

This is a sales management REST API in wich the user can create, read, update and delete sales and products. It was developed using the MSC architecture and the TDD principles.

## Used technologies

Back-end:


    JavaScript, NodeJS, Express, Docker, MYSQL


Tests:


    Mocha, Chai, Sinon


## Running application

Clone this repository

    git clone git@github.com:StephanCadu/store-manager.git

Go to the root directory

    cd store-manager
    
**OBS:** Make sure you have Docker installed!

Run the conteiners

    docker-compose up -d
    
Execute the container
    
    docker exec -it store_manager bash
    
Install the dependencies

    npm install

Run the application with

    npm run debug
    
Test the application with

    npm run test:mocha
