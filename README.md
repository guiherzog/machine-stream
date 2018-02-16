
# ZEISS MachineStream

ZEISS MachineStream is a smart maintenance solution for large industrial clients using different ZEISS products such as microscopes and measurement machines. 

It is planned to allow an operator to monitor these assets remotely in near real-time.

![Image of Dashboard](https://github.com/guiherzog/machine-stream/blob/master/docs/dashboard.png?raw=true)

## Online Demo
You can access the platform deployed on AWS EC2:
[Access Demonstration Now](http://34.217.180.82:3000)

## Project Stack
The tech stack for this project has been chosen with the main goal of providing a rapid prototyping framework to be able to **develop** and **build** on just a few hours. While it has many world-class development techniques, it still presents some disadvantages due to the limited timeframe and scope.
### Advantages
These are a few techniques, frameworks, tools that help in bringing a consistent code and more resilient to bugs, performance issues, etc.
 1. #### React to manage UI.
 2. #### Redux to manage States.
 3. #### Linting & Tests to provide code readability & cleanliness.
 4. #### Continuous Integration (GIT).
 5. #### High Modularity & Easy Maintainability.
 6. #### Grommet UI Library (For Rapid Prototyping).
 7. #### Proper Documentation from start.

### Disadvantages
These are a few points that could be improved on the project, if it was the case of continuing its development.

 1. #### Limited Styling Customisation.
 2. #### High Code Complexity.
 3. #### Code clarity & Comments.
 4. #### Refactor to remove unused code & some duplication.
 5. #### Use of **GitFlow**.
 6. #### Implement Continuous Deployment using Docker containers.
 7. #### Make events update all Data.

## Development Instructions 
To run this application in development mode, execute the following steps:

  1. Clone Repository:
    ```
      $ git clone https://github.com/guiherzog/machine-stream.git
    ```
  2. Rum NPM Install:
    ```
    $ npm install (or yarn install)
    ```
  3. Start the mock-up back-end server (to simulate login):
    ```
    $ npm run dev-server
    ```
  4. Start the front-end dev server:
    ```
    $ npm run dev
    ```
  5. To run basic tests and linters:
    ```
    $ npm test
    ```

## Management Tools

  **Agile Process Tool:** 
  
    Trello Board: https://trello.com/b/I7WrF4gc
    
  **Time Tracking & Management Tool:**
  
    TrackingTime: https://github.com/guiherzog/machine-stream/blob/master/docs/timetrackingmachinestream.pdf
    
  **Low-Fi & Design Tool:**
  
    Adobe Experience Design
