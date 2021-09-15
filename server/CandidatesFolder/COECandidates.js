const mongoose = require('mongoose')

const CoePresidentSchema = new mongoose.Schema({
    Name: String,
    cID: String
})
mongoose.model("COE PRESIDENT", CoePresidentSchema)

const CoeGenSecSchema = new mongoose.Schema({
    Name: String,
    cID: String
})
mongoose.model("COE GENERAL SECRETARY", CoeGenSecSchema)

const CoeFinSecSchema = new mongoose.Schema({
    Name: String,
    cID: String
})
mongoose.model("COE FINANCIAL SECRETARY", CoeFinSecSchema)

const CoeOrgSecSchema = new mongoose.Schema({
    Name: String,
    cID: String
})
mongoose.model("COE ORGANISING SECRETARY", CoeOrgSecSchema)

const CoeWocomSchema = new mongoose.Schema({
    Name: String,
    cID: String
})
mongoose.model("COE WOCOM", CoeWocomSchema)

//TOTAL VOTES

const CoePresidentVotes = new mongoose.Schema({
    president: String,
    cId: String
})

mongoose.model("COE PRESIDENT TOTAL VOTES", CoePresidentVotes)

const CoeGeneralSecVotes = new mongoose.Schema({
    Coegensec: String,
    cId: String
})

mongoose.model("COE GENERAL SECRETARY TOTAL VOTES", CoeGeneralSecVotes)

const CoeFinancialSecVotes = new mongoose.Schema({
    Coefensec: String,
    cId: String
})

mongoose.model("COE FINANCIAL SECRETARY TOTAL VOTES", CoeFinancialSecVotes)

const CoeOrganisingSecVotes = new mongoose.Schema({
    Coeorgsec: String,
    cId: String
})

mongoose.model("COE ORGANISING SECRETARY TOTAL VOTES", CoeOrganisingSecVotes)

const CoeWocomVotes = new mongoose.Schema({
    Coewocom: String,
    cId: String
})

mongoose.model("COE WOCOM TOTAL VOTES", CoeWocomVotes)