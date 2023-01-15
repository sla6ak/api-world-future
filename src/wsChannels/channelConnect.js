const channelConnect = (req) => {
    const allState = { channel: "connect", data: {} };
    const client = {};
    return { allState, client };
};

module.exports = { channelConnect };
