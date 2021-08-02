node {
    try {
        ws("workspace/SLRegCovidAppPublish") {
            stage('Start'){
                notifyBuild('STARTED')
            }
            stage('Clean WS'){
                step([$class: 'WsCleanup'])
            }
            stage('Checkout'){
                checkout scm
            }
            stage("NPM Install"){                               
                bat "npm install" 
            }  
            stage("Build"){
                bat "npm run build:prod" 
            }                 
            stage("StopPool"){
                bat "start cmd.exe /c scripts\\stoppool.bat"
            }
            stage("Deploy"){
                bat "start cmd.exe /c scripts\\deploy.bat"
            } 
             stage("StartPool"){
                bat "start cmd.exe /c scripts\\startpool.bat"
            }           
        }
    }
    catch(error){
        currentBuild.result = 'Failure'
    }
    stage('Finish'){
        notifyBuild(currentBuild.result)
    }

}

def notifyBuild(String buildStatus = 'STARTED') {
    // default build status in case is not passed as parameter
    buildStatus = buildStatus ?: 'SUCCESS'

    // variables and constants
    def colorName = 'RED'
    def colorCode = '#FF0000'
    def from = 'administrador2@saluslaboris.com.pe'
    def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
    def summary = "${subject} (${env.RUN_DISPLAY_URL})"
    def details = "<p>${buildStatus}: Job <a href='${env.RUN_DISPLAY_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a></p>"

    // override default values based on build status
    if (buildStatus == 'STARTED') {
        color = 'YELLOW'
        colorCode = '#FFFF00'
    } else if (buildStatus == 'SUCCESS') {
        color = 'GREEN'
        colorCode = '#00FF00'
    } else {
        color = 'RED'
        colorCode = '#FF0000'
    }

    // send notifications
    slackSend (
        color: colorCode,
        message: summary,
        channel: '#jenkins',
        teamDomain: 'td-saluslaboris',
        tokenCredentialId: 'td_slack_credentials')
   
}