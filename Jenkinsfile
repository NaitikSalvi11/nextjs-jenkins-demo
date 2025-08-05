pipeline {
    agent any
    
    environment {
        // Local Docker image configuration (no registry needed)
        IMAGE_NAME = 'nextjs-app'
        // Image tag (using build number for versioning)
        IMAGE_TAG = "${BUILD_NUMBER}"
        // Local image name (no registry prefix)
        FULL_IMAGE_NAME = "${IMAGE_NAME}:${IMAGE_TAG}"
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
                sh 'npm ci'
            }
        }
        
        stage('Lint') {
            steps {
                echo 'Running ESLint...'
                sh 'npm run lint'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm run test:ci'
            }
            post {
                always {
                    echo 'Test stage completed'
                }
            }
        }
        
        stage('Build Application') {
            steps {
                echo 'Building Next.js application...'
                sh 'npm run build'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    sh "docker build -t ${FULL_IMAGE_NAME} ."
                    echo "Built Docker image: ${FULL_IMAGE_NAME}"
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
                        docker stop nextjs-app-port60 || true
                        docker rm nextjs-app-port60 || true
                    '''
                    
                    // Run the new container on port 60
                    sh """
                        docker run -d \\
                            --name nextjs-app-port60 \\
                            --restart unless-stopped \\
                            -p 60:3000 \\
                            ${FULL_IMAGE_NAME}
                    """
                    
                    echo 'Application deployed successfully!'
                    echo 'Application is running at http://localhost:60'
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
