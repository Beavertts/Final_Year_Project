const mongoose = require('mongoose')

const SmsPresidentSchema = new mongoose.Schema({
    Name: String,
    cID: String
})
mongoose.model("SMS PRESIDENT", SmsPresidentSchema)

const SmsGenSecSchema = new mongoose.Schema({
    Name: String,
    cID: String
})
mongoose.model("SMS GENERAL SECRETARY", SmsGenSecSchema)

const SmsFinSecSchema = new mongoose.Schema({
    Name: String,
    cID: String
})
mongoose.model("SMS FINANCIAL SECRETARY", SmsFinSecSchema)

const SmsOrgSecSchema = new mongoose.Schema({
    Name: String,
    cID: String
})
mongoose.model("SMS ORGANISING SECRETARY", SmsOrgSecSchema)

const SmsWocomSchema = new mongoose.Schema({
    Name: String,
    cID: String
})
mongoose.model("SMS WOCOM", SmsWocomSchema)

//TOTAL VOTES

const SmsPresidentVotes = new mongoose.Schema({
    president: String,
    cId: String
})

mongoose.model("SMS PRESIDENT TOTAL VOTES", SmsPresidentVotes)

const SmsGeneralSecVotes = new mongoose.Schema({
    Smsgensec: String,
    cId: String
})

mongoose.model("SMS GENERAL SECRETARY TOTAL VOTES", SmsGeneralSecVotes)

const SmsFinancialSecVotes = new mongoose.Schema({
    Smsfensec: String,
    cId: String
})

mongoose.model("SMS FINANCIAL SECRETARY TOTAL VOTES", SmsFinancialSecVotes)

const SmsOrganisingSecVotes = new mongoose.Schema({
    Smsorgsec: String,
    cId: String
})

mongoose.model("SMS ORGANISING SECRETARY TOTAL VOTES", SmsOrganisingSecVotes)

const SmsWocomVotes = new mongoose.Schema({
    Smswocom: String,
    cId: String
})

mongoose.model("SMS WOCOM TOTAL VOTES", SmsWocomVotes)