components.chat = `
<section class="chat-container">
<div class="aside-left">
    <div id="list-conversations" class="list-conversation">
    </div>
    <form id= "form-add-conversation" class="form-add-conversation">
    <div class="input-wrapper">
        <input id="form-add-conversation-title-input" type="text" name="title" placeholder="Conversation">
        <div id="title-error" class="message-error"></div>
    </div>
    <div class="input-wrapper">
        <input id ="form-add-conversation-friend-email-input" type="text" name="friendEmail" placeholder="Your friend email">
        <div id="friend-email-error" class= "message-error"></div> 
    </div>
    <button id= "form-add-conversation-submit-btn" class="btn-icon" type="submit">
        <i class="fas fa-plus"></i>
    </button>
    </form>
</div>

<div class="current-conversation">
    <div id="list-messages" class="list-messages">
    </div>
    <form id= "form-chat" class="form-chat">
    <div class="input-wrapper">
        <input id="form-chat-input" type="text" name="message" placeholder="Enter your message">
    </div>
    <button id="form-chat-submit-btn" type="submit">Send</button>
    </form>
</div>    
<!-- right -->
</section>
`