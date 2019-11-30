const controller = {}

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

controller.loadConversation = async function() {
  let currentEmail = firebase.auth().currentUser.email
  let result = await firebase.firestore()
    .collection('conversations')
    // nâng cấp nè :v 
    .where('users' , 'array-contains' , currentEmail)
    .get()
  let docs = result.docs
  // 1 . transform documents
  // let conversations = []
  // for(let doc of docs) {
  //   let conversation = transformDoc(doc)
  //   conversations.push(conversation)
  // }
  let conversations = docs.map(transformDoc)
  // 2 . save data to model.js
  model.saveConversations(conversations)
  if(conversations.length) {
    let currentConversation = conversations[0]
    model.saveCurrentConversation(currentConversation)
  }
  // 3 . show data to view 
  view.showCurrentConversation() // model.currentConvesation.messages >> list-messages
  view.showConversations() // model.conversations
}

controller.setupDatabaseChange = function() {
  let currentEmail = firebase.auth().currentUser.email
  let isFirstTimeRun = true
  firebase.firestore()
    .collection('conversations')
    .where('users' , 'array-contains' , currentEmail)
    .onSnapshot(snapshotHandler)

    function snapshotHandler(snapshot) {
      if(isFirstTimeRun) {
        isFirstTimeRun = false
        return
      }
      let docChanges = snapshot.docChanges()
      for(let docChange of docChanges) {
        let conversation = transformDoc(docChange.doc)

        if(docChange.type == 'added' || docChange.type == 'modified') {
          model.updateConversation(conversation)
          if(model.currentConversation && model.currentConversation.id == conversation.id) {
            view.showCurrentConversation()
          } 
        }
      }
      view.showConversations()
    }
}

controller.addMessage = async function(messageContent) {
  let message = {
    content : messageContent,
    owner : firebase.auth().currentUser.email,
    createdAt : new Date().toISOString()
  }
  view.disable('form-chat-submit-btn')
  if(model.currentConversation) {
    await firebase.firestore()
      .collection('conversations')
      .doc(model.currentConversation.id)
      .update({
        messages : firebase.firestore.FieldValue.arrayUnion(message)
      })
    document.getElementById('form-chat-input').value = ""
  }
  view.enable('form-chat-submit-btn')
}

controller.addConversation = async function(title , friendEmail) {
  view.disable('form-add-conversation-submit-btn')
  try {
    let conversation = {
      title : title,
      users : [
        firebase.auth().currentUser.email,
        friendEmail
      ],
      messages : [],
      createdAt : new Date().toISOString()
    }
    await firebase
      .firestore()
      .collection('conversations')
      .add(conversation)
      document.getElementById('form-add-conversation-title-input').value = ""
      document.getElementById('form-add-conversation-friend-email-input').value = ""
  } catch(err) {
    view.setText('friend-email-error' , err.message)
  }
  view.enable('form-add-conversation-submit-btn')
}

function transformDoc(firestoreDoc) {
  let data = firestoreDoc.data()
  data.id = firestoreDoc.id

  return data
}