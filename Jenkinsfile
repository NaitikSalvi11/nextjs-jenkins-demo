pipeline {
    agent any
    
    environment {
        // Define your Docker Hub credentials ID (you'll need to set this up in Jenkins)
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials'
        // Your Docker Hub username
        DOCKER_HUB_USERNAME = 'your-dockerhub-username'
        // Image name
        IMAGE_NAME = 'nextjs-app'
        // Image tag (using build number for versioning)
        IMAGE_TAG = "${BUILD_NUMBER}"
        // Full image name
        FULL_IMAGE_NAME = "${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from repository...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                script {
                    // Use Node.js Docker image to install dependencies
                    docker.image('node:18-alpine').inside() {
                        sh 'npm ci'
                    }
                }
            }
        }
        
        stage('Lint') {
            steps {
                echo 'Running ESLint...'
                script {
                    docker.image('node:18-alpine').inside() {
                        sh 'npm run lint'
                    }
                }
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                script {
                    docker.image('node:18-alpine').inside() {
                        sh 'npm run test:ci'
                    }
                }
            }
            post {
                always {
                    // Publish test results (if you have test result files)
                    // publishTestResults testResultsPattern: 'test-results.xml'
                    echo 'Test stage completed'
                }
            }
        }
        
        stage('Build Application') {
            steps {
                echo 'Building Next.js application...'
                script {
                    docker.image('node:18-alpine').inside() {
                        sh 'npm run build'
                    }
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    def image = docker.build("${FULL_IMAGE_NAME}")
                    echo "Built Docker image: ${FULL_IMAGE_NAME}"
                }
            }
        }
        
        stage('Push to Registry') {
            when {
                branch 'main'
            }
            steps {
                echo 'Pushing Docker image to registry...'
                script {
                    docker.withRegistry('https://registry-1.docker.io/v2/', DOCKER_HUB_CREDENTIALS) {
                        def image = docker.image("${FULL_IMAGE_NAME}")
                        image.push()
                        image.push("latest")
                    }
                }
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying application...'
                script {
                    // Stop and remove existing container if it exists
                    sh '''
                        docker stop nextjs-app || true
                        docker rm nextjs-app || true
                    '''
                    
                    // Run the new container
                    sh """
                        docker run -d \\
                            --name nextjs-app \\
                            --restart unless-stopped \\
                            -p 3000:3000 \\
                            ${FULL_IMAGE_NAME}
                    """
                    
                    echo 'Application deployed successfully!'
                    echo 'Application is running at http://localhost:3000'
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline execution completed!'
            // Clean up workspace
            cleanWs()
        }
        success {
            echo 'Pipeline executed successfully! ✅'
            // You can add notification here (email, Slack, etc.)
        }
        failure {
            echo 'Pipeline failed! ❌'
            // You can add failure notification here
        }
    }
}
