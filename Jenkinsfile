pipeline {
    agent {
        docker {
            image 'docker:latest'
            args '--privileged -u root'
        }
    }

    tools {
        nodejs 'NodeJS 20' 
        docker 'docker'
    }

    environment {
        GITHUB_REPO = 'https://github.com/sarusikisslaszlo/ProgramrendszerekFejlesztese.git'
        BRANCH = 'master'
        KUBE_CONFIG = credentials('kubeconfig')
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_IMAGE_BACKEND = 'sarusikisslaszlo/backend'
        DOCKER_IMAGE_FRONTEND = 'sarusikisslaszlo/frontend'
        K8S_NAMESPACE = 'devops-project'
    }

    stages {
        stage('Check Docker Version') {
            steps {
                sh 'docker --version'
            }
        }
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: env.BRANCH, url: env.GITHUB_REPO
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend/financial-app-frontend') {
                    sh 'npm ci'
                }
            }
        }

        // stage('Lint') {
            // steps {
                // sh 'npm run lint'
            // }
        // }

        stage('Test Source - Backend') {
            steps {
                dir('backend') {
                    sh 'npm run test'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh """
                        docker build -t ${DOCKER_IMAGE_BACKEND}:latest ./backend
                        docker build -t ${DOCKER_IMAGE_FRONTEND}:latest ./frontend/financial-app-frontend
                    """
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                withDockerRegistry([credentialsId: 'dockerhub-credentials', url: "https://${DOCKER_REGISTRY}"]) {
                    sh """
                        docker push ${DOCKER_IMAGE_BACKEND}:latest
                        docker push ${DOCKER_IMAGE_FRONTEND}:latest
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            environment {
                KUBECONFIG = credentials('kubeconfig')
            }
            steps {
                script {
                    sh """
                        kubectl config use-context my-k8s-cluster
                        kubectl apply -f k8s/namespace.yaml
                        kubectl apply -f k8s/backend-deployment.yaml
                        kubectl apply -f k8s/frontend-deployment.yaml
                        kubectl rollout status deployment/backend -n ${K8S_NAMESPACE}
                        kubectl rollout status deployment/frontend -n ${K8S_NAMESPACE}
                    """
                }
            }
        }

        // stage('Test Distribution') {
            // steps {
                // sh 'npm run test:dist'
            // }
        // }

        // stage('Archive Artifacts') {
            // steps {
                // archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
            // }
        // }

        stage('Deploy') {
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                }
            }
            steps {
                echo 'Deploying the application...'
                // Itt jönnének a tényleges deployment lépések
                // Például: sh 'ssh user@server "cd /path/to/app && git pull && npm ci && npm run build && pm2 restart app"'
            }
        }

        stage('Cleanup') {
            steps {
                // Munkaterület tisztítása
                deleteDir()
            }
        }
    }

    post {
        success {
            echo 'Pipeline sikeresen lefutott!'
        }
        failure {
            echo 'A pipeline végrehajtása sikertelen volt.'
            // Itt értesítést küldhetnénk, például e-mailt vagy Slack üzenetet
        }
    }
}