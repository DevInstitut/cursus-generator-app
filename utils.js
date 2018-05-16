module.exports = {
    findRepoName : (gitUrl) => {
        const splittedGitUrl = gitUrl.split('/')
        return splittedGitUrl[splittedGitUrl.length -1]
    }
}