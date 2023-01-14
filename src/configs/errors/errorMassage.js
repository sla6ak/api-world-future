const Error = (res, status, error) => {
    if (!error) {
        error = "No information";
    }
    if (status === 400) return res.status(status).json({ massage: `Warning syntacsis error!`, error: error });
    if (status === 401) return res.status(status).json({ massage: `Warning you are not autorized!`, error: error });
    if (status === 404) return res.status(status).json({ massage: `Warning request element not found!`, error: error });
    if (status === 500) return res.status(status).json({ massage: `Server error, try again later`, error: error });
    if (status === 504) return res.status(status).json({ massage: `Data base error, try again later`, error: error });
    if (status === 700) return res.status(status).json({ massage: `Find please error`, error: error });
    return res.status(500).json({ massage: `what happends? bug ))` });
};
module.exports = Error;
