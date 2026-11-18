const demoData = require("../APIs/DemoApis.json");

const DemoAPIs = (req, res) => {
    res.status(200).json({
        message: "Dummy data fetched successfully.",
        data: demoData
    });
};

module.exports = { DemoAPIs };