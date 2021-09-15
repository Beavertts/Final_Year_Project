const mongoose = require('mongoose')

const KsbPresidentSchema = new mongoose.Schema({
    Name: String,
    cID: String
})
mongoose.model("KSB PRESIDENT", KsbPresidentSchema)

const KsbGenSecSchema = new mongoose.Schema({
    Name: String,
    cID: String
})
mongoose.model("KSB GENERAL SECRETARY", KsbGenSecSchema)

const KsbFinSecSchema = new mongoose.Schema({
    Name: String,
    cID: String
})
mongoose.model("KSB FINANCIAL SECRETARY", KsbFinSecSchema)

const KsbOrgSecSchema = new mongoose.Schema({
    Name: String,
    cID: String
})
mongoose.model("KSB ORGANISING SECRETARY", KsbOrgSecSchema)

const KsbWocomSchema = new mongoose.Schema({
    Name: String,
    cID: String
})
mongoose.model("KSB WOCOM", KsbWocomSchema)

//TOTAL VOTES

const KsbPresidentVotes = new mongoose.Schema({
    president: String,
    cId: String
})

mongoose.model("KSB PRESIDENT TOTAL VOTES", KsbPresidentVotes)

const KsbGeneralSecVotes = new mongoose.Schema({
    Ksbgensec: String,
    cId: String
})

mongoose.model("KSB GENERAL SECRETARY TOTAL VOTES", KsbGeneralSecVotes)

const KsbFinancialSecVotes = new mongoose.Schema({
    Ksbfensec: String,
    cId: String
})

mongoose.model("KSB FINANCIAL SECRETARY TOTAL VOTES", KsbFinancialSecVotes)

const KsbOrganisingSecVotes = new mongoose.Schema({
    Ksborgsec: String,
    cId: String
})

mongoose.model("KSB ORGANISING SECRETARY TOTAL VOTES", KsbOrganisingSecVotes)

const KsbWocomVotes = new mongoose.Schema({
    Ksbwocom: String,
    cId: String
})

mongoose.model("KSB WOCOM TOTAL VOTES", KsbWocomVotes)