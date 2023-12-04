pipeline {
    agent { label 'DockerAgent' } 
    environment {
        DOCKERHUB_CREDENTIALS = credentials('djtoler-dockerhub')
        PATH = "/home/ubuntu/.nvm/versions/node/v10.24.1/bin:$PATH"
    }
    
    stages {
        stage('TestFrontend') {
            steps {
                //list docker layers that are taking up instance space and pass the list to the remove command
                //remove a Deployment9 directory if it exists
                //kill any process running on port 3000 which we need clear to test our frontend app
                //clone the repo & move into the frontend directory
                //npm ci vs npm install: faster, made for ci pipelines, skips checking for updates or version compatability
                //start the frontend in the background and keep it running to capture the output and write it to a file
                //give the frontend 30 seconds to fully start
                //search the output txt file for the success message
                sh '''#!/bin/bash
                  docker images -f "dangling=true" -q | xargs docker rmi
                  rm -rf REPO
                  npx kill-port 3000
                  git clone REPO
                  cd REPO/react
                  npm ci
                  nohup npm start > frontend_start.txt &
                  sleep 30
                  grep "Compiled successfully!" frontend_start.txt
              '''
            }
        }

        stage('BuildFrontend') {
            steps {
              dir('react') {
                sh 'docker build --no-cache -t user/imagetag .'
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push user/imagetag'  // Corrected the Docker image tag for push
            }
        }
              }
       

        stage('BuildTestBackend') {
            steps {
              dir('backend') {
                //stop and remove any of our backend containers that may still be on our instance
                //build the backend image 
                //start the backend container
                //dynamically grab the current ip address of our instance
                //store it in a variable
                //curl a backend api endpoint with the -f(failure) flag so the script stops when theres a 400/500 response and keeps going otherwise
                //after a successful request, stop and remove the container
                sh '''#!/bin/bash
                docker stop be_test || true
                docker rm be_test || true
                sudo docker build --no-cache -t djtoler/dp9backend .
                docker run -d -p 8000:8000 --name be_test djtoler/dp9backend
                IP=$(aws ec2 describe-instances --filters "Name=tag:Name,Values=DP9_Docker_Instance" --query "Reservations[*].Instances[*].PublicIpAddress" --output text)
                export IP
                echo "IP is $IP"
                curl -f http://$IP:8000/api/products/
                docker stop be_test
                docker rm be_test
              '''
              }
            }
        }
        
        
        stage('Deploy') {
            steps {
                sh 'docker compose up' 
                }
              }
            }
        }
        
       
     
