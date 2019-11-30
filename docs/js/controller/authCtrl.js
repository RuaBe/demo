controller.register = async function(registerInfo) {
    let email = registerInfo.email
    let password = registerInfo.password
    let displayName = registerInfo.lastname + ' ' + registerInfo.firstname
    view.setText('register-success', '')
    view.setText('register-error', '')

    view.disable('register-submit-btn')
    try {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    await firebase.auth().currentUser.updateProfile({
        displayName: displayName
    })
    await firebase.auth().currentUser.sendEmailVerification()
    view.setText('register-success', 'An email verification has been sended to your email!')
    } catch(err) {
    view.setText('register-error', err.message)
    }
    view.enable('register-submit-btn')
}

controller.logIn = async function(logInInfo) {
    let email = logInInfo.email
    let password = logInInfo.password

    view.setText('log-in-error', '')
    view.disable('log-in-submit-btn')
    try {
    let result = await firebase.auth().signInWithEmailAndPassword(email, password)
    if(!result.user.emailVerified) {
        throw new Error('You must verify email!')
    }
    } catch(err) {
    view.setText('log-in-error', err.message)
    view.enable('log-in-submit-btn')
    }
}
