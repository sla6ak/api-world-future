const channelConnect = (req) => {
    const allState = { channel: "connect", data: {} };
    return { allState };
};

module.exports = { channelConnect };
