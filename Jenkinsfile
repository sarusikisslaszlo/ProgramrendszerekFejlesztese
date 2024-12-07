pipeline {
    agent any

    tools {
        nodejs 'NodeJS 20' 
    }

    environment {
        GITHUB_REPO = 'https://github.com/sarusikisslaszlo/ProgramrendszerekFejlesztese.git'
        BRANCH = 'master'
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

        stage('Test Distribution') {
            steps {
                sh 'npm run test:dist'
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
            }
        }

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