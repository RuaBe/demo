
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
