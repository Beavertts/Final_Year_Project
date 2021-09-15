const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    userId: String,
    status: Boolean,
    username: String,
    password: String,
    name: String,
    email: String,
    phone: String,
    picture: String,
    salary: String,
    course: String,
    college: String,
    votePresident: String,
    voteVicePresident: String,
    voteDepartment: String,
})
mongoose.model("student", StudentSchema)

const srcPRESIDENTsCHEMA = new mongoose.Schema({
    srcPresidentName: String,
    srcPresidentPicture: String,
    srcPresidentCandidateNumber: String,

})
mongoose.model("SRC PRESIDENTS", srcPRESIDENTsCHEMA)

const srcGENSECsCHEMA = new mongoose.Schema({
    srcGenSecName: String,
    srcGenSecPicture: String,
    srcGenSecCandidateNumber: String,

})
mongoose.model("SRC GENERAL SECRETARIES", srcGENSECsCHEMA)

const srcFINSECsCHEMA = new mongoose.Schema({
    srcFinSecName: String,
    srcFinSecPicture: String,
    srcFinSecCandidateNumber: String,

})
mongoose.model("SRC FINANCIAL SECRETARIES", srcFINSECsCHEMA)

const srcWOCOMsCHEMA = new mongoose.Schema({
    srcWoComName: String,
    srcWoComPicture: String,
    srcWoComCandidateNumber: String,

})
mongoose.model("SRC WOMEN COMMISSIONERS", srcWOCOMsCHEMA)

// posting all votes

const PresidentTotalVotes = new mongoose.Schema({
    president: String,
    cId: String
})

mongoose.model("VOTES PRESIDENT TOTAL", PresidentTotalVotes)

const GenSecTotalVotes = new mongoose.Schema({
    gensec: String,
    cId: String
})

mongoose.model("VOTES GENERAL SECRETARY TOTAL", GenSecTotalVotes)

const FinSecTotalVotes = new mongoose.Schema({
    finsec: String,
    cId: String
})

mongoose.model("VOTES FINANCIAL SECRETARY TOTAL", FinSecTotalVotes)

const WoComTotalVotes = new mongoose.Schema({
    wocom: String,
    cId: String
})

mongoose.model("VOTES WOCOM TOTAL", WoComTotalVotes)
