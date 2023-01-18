const channelChat = ( chatData ) => {
    const { message, username } = chatData;
    console.log("user:", username, " - message:", message)
    return {};
};

module.exports = { channelChat };
