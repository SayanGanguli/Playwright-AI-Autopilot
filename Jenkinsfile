pipeline {
    agent any

    environment {
        BASE_URL = 'https://opensource-demo.orangehrmlive.com'
        CI = 'true'
        TZ = 'Asia/Kolkata'
    }

    triggers {
        cron('30 0 * * *')
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps chromium'
            }
        }

        stage('Run Playwright tests') {
            steps {
                retry(2) {
                    sh 'npx playwright test --reporter=line'
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**, reporting-labs/**', allowEmptyArchive: true
            script {
                if (fileExists('playwright-report/index.html')) {
                    echo 'HTML report generated successfully.'
                }
                if (fileExists('test-results')) {
                    echo 'Artifacts are stored including screenshots, videos, and traces for failed tests.'
                }
            }
        }

        success {
            echo 'Playwright suite passed successfully.'
        }

        failure {
            echo 'Playwright execution failed. Screenshots, videos, and traces are available in the archived artifacts.'
        }
    }
}
