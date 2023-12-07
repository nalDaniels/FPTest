pipeline {
    agent { label 'DockerAgent' } 
    environment {
        DOCKERHUB_CREDENTIALS = credentials('lani23-dockerhub')
       
    }
    
    stages {
        stage('TestFrontend') {
            steps {
                sh '''#!/bin/bash
                  cd react
                  sudo apt install npm
                  npm install
                  npm test
              '''
            }
        }

        stage('BuildFrontend') {
            steps {
              dir('react') {
                sh 'docker build --no-cache -t lani23/frontend .'
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push lani23/frontend'  // Corrected the Docker image tag for push
            }
        }
              }
       

        
         stage('BuildBackend') {
            steps {
              dir('routes') {
                sh 'docker build --no-cache -t lani23/backend .'
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push lani23/backend'  // Corrected the Docker image tag for push
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
        
       
     
