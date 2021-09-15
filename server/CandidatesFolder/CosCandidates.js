const mongoose = require('mongoose')

const ScisaPresidentSchema = new mongoose.Schema({
    Name: String,
    cID: String
})
mongoose.model("SCISA PRESIDENT", ScisaPresidentSchema)

const ScisaGenSecSchema = new mongoose.Schema({
    Name: String,
    cID: String
})
mongoose.model("SCISA GENERAL SECRETARY", ScisaGenSecSchema)

const ScisaFinSecSchema = new mongoose.Schema({
    Name: String,
    cID: String
})
mongoose.model("SCISA FINANCIAL SECRETARY", ScisaFinSecSchema)

const ScisaOrgSecSchema = new mongoose.Schema({
    Name: String,
    cID: String
})
mongoose.model("SCISA ORGANISING SECRETARY", ScisaOrgSecSchema)

const ScisaWocomSchema = new mongoose.Schema({
    Name: String,
    cID: String
})
mongoose.model("SCISA WOCOM", ScisaWocomSchema)

//TOTAL VOTES

const ScisaPresidentVotes = new mongoose.Schema({
    president: String,
    cId: String
})

mongoose.model("SCISA PRESIDENT TOTAL VOTES", ScisaPresidentVotes)

const ScisaGeneralSecVotes = new mongoose.Schema({
    Scisagensec: String,
    cId: String
})

mongoose.model("SCISA GENERAL SECRETARY TOTAL VOTES", ScisaGeneralSecVotes)

const ScisaFinancialSecVotes = new mongoose.Schema({
    Scisafensec: String,
    cId: String
})

mongoose.model("SCISA FINANCIAL SECRETARY TOTAL VOTES", ScisaFinancialSecVotes)

const ScisaOrganisingSecVotes = new mongoose.Schema({
    Scisaorgsec: String,
    cId: String
})

mongoose.model("SCISA ORGANISING SECRETARY TOTAL VOTES", ScisaOrganisingSecVotes)

const ScisaWocomVotes = new mongoose.Schema({
    Scisawocom: String,
    cId: String
})

mongoose.model("SCISA WOCOM TOTAL VOTES", ScisaWocomVotes)