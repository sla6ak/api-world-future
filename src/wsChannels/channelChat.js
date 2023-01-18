const channelChat = ( chatData ) => {
    const { author, message, planet, race } = chatData;

    console.log("user:", author, " - message:", message);
    
    return {};
};

module.exports = { channelChat };
