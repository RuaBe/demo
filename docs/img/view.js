const view = {}

/**
 * name ~ 'register' | 'logIn', ..any screen name in system
 */
view.showComponent = function(name) {
  switch(name) {
    case 'register': {
      // 1. hien thi phan html len man hinh
      let app = document.getElementById('app')
      app.innerHTML = components.register

      // 2. gan su kien cho cac the
      let link = document.getElementById('register-link')
      link.onclick = linkClickHandler

      let form = document.getElementById('register-form')
      form.onsubmit = formSubmitHandler

      function linkClickHandler() {
        view.showComponent('logIn')
      }

      function formSubmitHandler(event) {
        // chan su kien mac dinh
        // >> khong gui thong tin len thanh dia chi
        event.preventDefault()
        
        // 1. lay thong tin cua user
        let registerInfo = {
          firstname: form.firstname.value,
          lastname: form.lastname.value,
          email: form.email.value,
          password: form.password.value,
          confirmPassword: form.confirmPassword.value
        }

        // 2. validate thong tin
        let validateResult = [
          view.validate(registerInfo.firstname, 'firstname-error', 'Invalid firstname!'),
          view.validate(registerInfo.lastname, 'lastname-error', 'Invalid lastname!'),
          view.validate(
            registerInfo.email && registerInfo.email.includes('@'),
            'email-error',
            'Invalid email!'
          ),
          view.validate(
            registerInfo.password && registerInfo.password.length >= 6,
            'password-error',
            'Invalid password!'
          ),
          view.validate(
            registerInfo.confirmPassword
              && registerInfo.confirmPassword.length >= 6
              && registerInfo.confirmPassword == registerInfo.password,
            'confirm-password-error',
            'Invalid confirm password!'
          )
        ]
        
        // 3. submit thong tin
        if(allPassed(validateResult)) {
          controller.register(registerInfo)
        }
      }

      break
    }
    case 'logIn': {
      let app = document.getElementById('app')
      app.innerHTML = components.logIn

      let link = document.getElementById('log-in-link')
      link.onclick = linkClickHandler

      let form = document.getElementById('log-in-form')
      form.onsubmit = formSubmitHandler

      function linkClickHandler() {
        view.showComponent('register')
      }

      function formSubmitHandler(e) {
        e.preventDefault()
        let logInInfo = {
          email: form.email.value,
          password: form.password.value
        }

        let validateResult = [
          view.validate(logInInfo.email, 'email-error', 'Invalid email!'),
          view.validate(logInInfo.password, 'password-error', 'Invalid password!'),
        ]

        if(allPassed(validateResult)) {
          controller.logIn(logInInfo)
        }
      }

      break
    }
    case 'chat': {
      let app = document.getElementById('app')
      app.innerHTML = components.nav + components.chat

      controller.loadConversation()
      controller.setupDatabaseChange()

      // view.setText('user-email', firebase.auth().currentUser.email)
      view.setText('user-email', firebase.auth().currentUser.displayName)
      // profile email

      let btnSignOut = document.getElementById('sign-out-btn')
      btnSignOut.onclick = signOut

      let formChat = document.getElementById('form-chat')
      formChat.onsubmit = formChatSubmitHandler

      let formAddConversation = document.getElementById('form-add-conversation')
      formAddConversation.onsubmit = formAddConversationSubmitHandler

      function signOut() {
        firebase.auth().signOut()
      }

      function formChatSubmitHandler(e) {
        e.preventDefault()
        // 
        let messageContent = formChat.message.value.trim()
        
        if(messageContent) {
          controller.addMessage(messageContent)
        }
      }

      function formAddConversationSubmitHandler(e) {
        e.preventDefault()
        // 1 . get info 
        let title = formAddConversation.title.value.trim()
        let friendEmail = formAddConversation.friendEmail.value.trim()
        // 2 . validate info
        let validateResult = [
          view.validate(title , 'title-error' , 'Title required!'),
          view.validate(friendEmail , 'friend-email-error' , 'Email required!')
        ]
        // 3 . submit info 
        if(allPassed(validateResult)) {
          controller.addConversation(title, friendEmail)
        //   let conversation = {
        //     title : title,
        //     users: [
        //       firebase.auth().currentUser.email,
        //       friendEmail
        //     ],
        //     messages: [],
        //     createdAt : new Date().toISOString()
        //   }
        //   firebase
        //   .firestore()
        //   .collection('conversations')
        //   .add(conversation)
        }
      }

      break
    }
    case 'loading': {
      let app = document.getElementById('app')
      app.innerHTML = components.loading

      break
    }
  }
}

view.showCurrentConversation = function() {
  if(model.currentConversation) {
    let messages = model.currentConversation.messages
    let listMessages = document.getElementById('list-messages')
    listMessages.innerHTML = ""

    // show all messages to screen
    for(let message of messages) {
      let className = ""
      if(message.owner == firebase.auth().currentUser.email) {
        className = "message-chat your"
      } else {
        className = "message-chat"
      }
      let html = `
      <div class="${className} ">
        <span>${message.content}</span>
      </div>
      `
      listMessages.innerHTML += html
    }

    listMessages.scrollTop = listMessages.scrollHeight

    // let fakeMessages = ["Hello" ,"Hi !!!!"]
    // for(let message of fakeMessages ) {
    //   let html = `
    //   <div class ="message-chat">
    //     <span>${message}</span>
    //   </div>
    //   `
    //   listMessages.innerHTML += html
    // }
  }
}

view.showConversations = function() {
  if(model.conversations) {
    let conversations = model.conversations
    let listConversations = document.getElementById('list-conversations')
    listConversations.innerHTML = ""

    // show 
    for(conversation of conversations) {
      // 1 . mark current conversation
      let className = ""
      if(conversation.id == model.currentConversation.id) {
        className = "conversation current"
      } else {
        className = "conversation"
      }

      let html = `
        <div id= "${conversation.id}" class="${className}">
          <div class="conversation-title">${conversation.title}</div>
          <div class="conversation-member">${conversation.users.length} member </div>
        </div>
      `
      listConversations.innerHTML += html
    }

    // add event click 
    for(let conversation of conversations) {
      let conversationDiv = document.getElementById(conversation.id)
      conversationDiv.onclick = conversationClickHandler

      function conversationClickHandler() {
        model.saveCurrentConversation(conversation)
        view.showCurrentConversation()
        view.showConversations()
      }
    }
  }
}

view.setText = function(id, text) {
  document.getElementById(id).innerText = text
}

view.validate = function(condition, idErrorTag, messageError) {
  if(condition) {
    view.setText(idErrorTag, '')
    return true
  } else {
    view.setText(idErrorTag, messageError)
    return false
  }
}

view.disable = function(id) {
  document.getElementById(id).setAttribute('disabled', true)
}

view.enable = function(id) {
  document.getElementById(id).removeAttribute('disabled')
}

function allPassed(validateResult) {
  for(let validate of validateResult) {
    if(!validate) {
      return false
    }
  }
  return true
}