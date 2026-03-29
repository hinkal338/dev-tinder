const authAdmin = (req, res, next) => {
    console.log("Auth admin called");
    const token = "admin";
    const isAuthorizedAdmin = token === "admin";
    if (!isAuthorizedAdmin) {
        res.status(401).send("Unauthorized Admin !!");
    } else {
        next();
    }
}

const authUser = (req, res, next) => {
    console.log("Auth user called");
    const token = "user";
    const isAuthorizedUser = token === "user";
    if (!isAuthorizedUser) {
        res.status(401).send("Unauthorized User !!");
    } else {
        next();
    }
};

module.exports = { authAdmin, authUser };