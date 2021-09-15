const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./Employee");
require("./CandidatesFolder/CosCandidates");
require("./CandidatesFolder/COECandidates");
require("./CandidatesFolder/KSBCandidates");
require("./CandidatesFolder/SMSCandidates");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(bodyParser.json());

const SrcWoCom = mongoose.model("SRC WOMEN COMMISSIONERS");
const SrcFinancialSecretary = mongoose.model("SRC FINANCIAL SECRETARIES");
const SrcGeneralSecretary = mongoose.model("SRC GENERAL SECRETARIES");
const SrcPresident = mongoose.model("SRC PRESIDENTS");

const ScisaPresident = mongoose.model("SCISA PRESIDENT");
const ScisaGeneralSecretary = mongoose.model("SCISA GENERAL SECRETARY");
const ScisaFinancialSecretary = mongoose.model("SCISA FINANCIAL SECRETARY");
const ScisaOrganisingSecretary = mongoose.model("SCISA ORGANISING SECRETARY");
const ScisaWocom = mongoose.model("SCISA WOCOM");

const CoePresident = mongoose.model("COE PRESIDENT");
const CoeGeneralSecretary = mongoose.model("COE GENERAL SECRETARY");
const CoeFinancialSecretary = mongoose.model("COE FINANCIAL SECRETARY");
const CoeOrganisingSecretary = mongoose.model("COE ORGANISING SECRETARY");
const CoeWocom = mongoose.model("COE WOCOM");

const KsbPresident = mongoose.model("KSB PRESIDENT");
const KsbGeneralSecretary = mongoose.model("KSB GENERAL SECRETARY");
const KsbFinancialSecretary = mongoose.model("KSB FINANCIAL SECRETARY");
const KsbOrganisingSecretary = mongoose.model("KSB ORGANISING SECRETARY");
const KsbWocom = mongoose.model("KSB WOCOM");

const SmsPresident = mongoose.model("SMS PRESIDENT");
const SmsGeneralSecretary = mongoose.model("SMS GENERAL SECRETARY");
const SmsFinancialSecretary = mongoose.model("SMS FINANCIAL SECRETARY");
const SmsOrganisingSecretary = mongoose.model("SMS ORGANISING SECRETARY");
const SmsWocom = mongoose.model("SMS WOCOM");

const Student = mongoose.model("student");

const President = mongoose.model("VOTES PRESIDENT TOTAL");
const Gensec = mongoose.model("VOTES GENERAL SECRETARY TOTAL");
const Finsec = mongoose.model("VOTES FINANCIAL SECRETARY TOTAL");
const Wocom = mongoose.model("VOTES WOCOM TOTAL");

const ScisaPres = mongoose.model("SCISA PRESIDENT TOTAL VOTES");
const ScisaGenSec = mongoose.model("SCISA GENERAL SECRETARY TOTAL VOTES");
const ScisaFinSec = mongoose.model("SCISA FINANCIAL SECRETARY TOTAL VOTES");
const ScisaOrgSec = mongoose.model("SCISA ORGANISING SECRETARY TOTAL VOTES");
const ScisaWocomTotal = mongoose.model("SCISA WOCOM TOTAL VOTES");

const CoePres = mongoose.model("COE PRESIDENT TOTAL VOTES");
const CoeGenSec = mongoose.model("COE GENERAL SECRETARY TOTAL VOTES");
const CoeFinSec = mongoose.model("COE FINANCIAL SECRETARY TOTAL VOTES");
const CoeOrgSec = mongoose.model("COE ORGANISING SECRETARY TOTAL VOTES");
const CoeWocomTotal = mongoose.model("COE WOCOM TOTAL VOTES");

const KsbPres = mongoose.model("KSB PRESIDENT TOTAL VOTES");
const KsbGenSec = mongoose.model("KSB GENERAL SECRETARY TOTAL VOTES");
const KsbFinSec = mongoose.model("KSB FINANCIAL SECRETARY TOTAL VOTES");
const KsbOrgSec = mongoose.model("KSB ORGANISING SECRETARY TOTAL VOTES");
const KsbWocomTotal = mongoose.model("KSB WOCOM TOTAL VOTES");

const SmsPres = mongoose.model("SMS PRESIDENT TOTAL VOTES");
const SmsGenSec = mongoose.model("SMS GENERAL SECRETARY TOTAL VOTES");
const SmsFinSec = mongoose.model("SMS FINANCIAL SECRETARY TOTAL VOTES");
const SmsOrgSec = mongoose.model("SMS ORGANISING SECRETARY TOTAL VOTES");
const SmsWocomTotal = mongoose.model("SMS WOCOM TOTAL VOTES");

const mondURL =
  "mongodb+srv://bTTs:O4Lo6GKdygcS9q2m@empapp-n4xqw.mongodb.net/bTTs?retryWrites=true&w=majority";

//connecting to database
mongoose.connect(mondURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on("error", (err) => {
  console.log("error", err);
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});

app.get("/", (req, res) => {
  Student.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//GETTING LIST OF SRC CANDIDATES
app.get("/src-presidents", (req, res) => {
  SrcPresident.find({})
    .then((SRCdata) => {
      res.send(SRCdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/src-gensec", (req, res) => {
  SrcGeneralSecretary.find({})
    .then((SRCGdata) => {
      res.send(SRCGdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/src-finsec", (req, res) => {
  SrcFinancialSecretary.find({})
    .then((SRCFdata) => {
      res.send(SRCFdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/src-wocom", (req, res) => {
  SrcWoCom.find({})
    .then((SRCWdata) => {
      res.send(SRCWdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get(`/:id/:username/:password`, (req, res) => {
  const meme = {
    userId: req.params.id,
    username: req.params.username,
    password: req.params.password,
  };
  Student.findOne(meme)
    .then((data) => {
      if (data) res.status(200).send({ payload: data });
      else res.status(404).send({ message: "No such user found" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//change status aftet voting
app.post("/update", (req, res) => {
  console.log("Update Route", req.body);
  Student.updateOne(
    { userId: req.body.userId },
    {
      $set: {
        status: req.body.status,
      },
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log("server running");
  console.log("waiting for connection to mongoDB");
});

//posting the SRC results
app.post("/send-presidenttotalvotes", (req, res) => {
  const pres = new President({
    president: req.body.president,
  });
  pres
    .save()
    .then((PresTotal) => {})
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-gensectotalvotes", (req, res) => {
  const gensecs = new Gensec({
    gensec: req.body.gensec,
  });
  gensecs
    .save()
    .then((GenSecTotal) => {})
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-finsectotalvotes", (req, res) => {
  const finsecs = new Finsec({
    finsec: req.body.finsec,
  });
  finsecs
    .save()
    .then((FinSecTotal) => {})
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-wocomtotalvotes", (req, res) => {
  const wocoms = new Wocom({
    wocom: req.body.wocom,
  });
  wocoms
    .save()
    .then((WocomTotal) => {})
    .catch((err) => {
      console.log(err);
    });
});

//GET SCISAs
app.get("/scisa-presidents", (req, res) => {
  ScisaPresident.find({})
    .then((ScPdata) => {
      res.send(ScPdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/scisa-gensec", (req, res) => {
  ScisaGeneralSecretary.find({})
    .then((ScGdata) => {
      res.send(ScGdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/scisa-finsec", (req, res) => {
  ScisaFinancialSecretary.find({})
    .then((ScFdata) => {
      res.send(ScFdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/scisa-orgsec", (req, res) => {
  ScisaOrganisingSecretary.find({})
    .then((ScFdata) => {
      res.send(ScFdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/scisa-wocom", (req, res) => {
  ScisaWocom.find({})
    .then((ScWdata) => {
      res.send(ScWdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

//POST SCISA TOTAL VOTES
app.post("/send-scisapresvotes", (req, res) => {
  const scisapres = new ScisaPres({
    president: req.body.president,
    cId: req.body.cId,
  });
  scisapres
    .save()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-scisagenvotes", (req, res) => {
  const scisagensec = new ScisaGenSec({
    Scisagensec: req.body.Scisagensec,
    cId: req.body.cId,
  });
  scisagensec
    .save()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-scisafinvotes", (req, res) => {
  const scisafinsec = new ScisaFinSec({
    Scisafinsec: req.body.Scisafinsec,
    cId: req.body.cId,
  });
  scisafinsec
    .save()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-scisaorgvotes", (req, res) => {
  const scisaorgsec = new ScisaOrgSec({
    Scisaorgsec: req.body.Scisaorgsec,
    cId: req.body.cId,
  });
  scisaorgsec
    .save()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-scisawocomtvotes", (req, res) => {
  const scisawocoms = new ScisaWocomTotal({
    Scisawocom: req.body.Scisawocom,
    cId: req.body.cId,
  });
  scisawocoms
    .save()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
});

//GET COE
app.get("/coe-presidents", (req, res) => {
  CoePresident.find({})
    .then((CoPdata) => {
      res.send(CoPdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/coe-gensec", (req, res) => {
  CoeGeneralSecretary.find({})
    .then((CoGdata) => {
      res.send(CoGdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/coe-finsec", (req, res) => {
  CoeFinancialSecretary.find({})
    .then((CoFdata) => {
      res.send(CoFdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/coe-orgsec", (req, res) => {
  CoeOrganisingSecretary.find({})
    .then((CoFdata) => {
      res.send(CoFdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/coe-wocom", (req, res) => {
  CoeWocom.find({})
    .then((CoWdata) => {
      res.send(CoWdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

//post ksb candidates
app.post("/smsw", (req, res) => {
  const smsw = new SmsWocom({
    Name: req.body.Name,
    cID: req.body.cID,
  });
  smsw
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//POST COE TOTAL VOTES
app.post("/send-coepresvotes", (req, res) => {
  const coepres = new CoePres({
    president: req.body.president,
    cId: req.body.cId,
  });
  coepres
    .save()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-coegenvotes", (req, res) => {
  const coegensec = new CoeGenSec({
    Coegensec: req.body.Coegensec,
    cId: req.body.cId,
  });
  coegensec
    .save()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-coefinvotes", (req, res) => {
  const coefinsec = new CoeFinSec({
    Coefinsec: req.body.Coefinsec,
    cId: req.body.cId,
  });
  coefinsec
    .save()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-coeorgvotes", (req, res) => {
  const coeorgsec = new CoeOrgSec({
    Coeorgsec: req.body.Coeorgsec,
    cId: req.body.cId,
  });
  coeorgsec
    .save()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-coewocomtvotes", (req, res) => {
  const coewocoms = new CoeWocomTotal({
    Coewocom: req.body.Coewocom,
    cId: req.body.cId,
  });
  coewocoms
    .save()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
});

//GET KSBS
app.get("/ksb-presidents", (req, res) => {
  KsbPresident.find({})
    .then((KsbPdata) => {
      res.send(KsbPdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/ksb-gensec", (req, res) => {
  KsbGeneralSecretary.find({})
    .then((KsbGdata) => {
      res.send(KsbGdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/ksb-finsec", (req, res) => {
  KsbFinancialSecretary.find({})
    .then((KsbFdata) => {
      res.send(KsbFdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/ksb-orgsec", (req, res) => {
  KsbOrganisingSecretary.find({})
    .then((KsbFdata) => {
      res.send(KsbFdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/ksb-wocom", (req, res) => {
  KsbWocom.find({})
    .then((KsbWdata) => {
      res.send(KsbWdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

//POST KSB TOTAL VOTES
app.post("/send-ksbpresvotes", (req, res) => {
  const ksbpres = new KsbPres({
    president: req.body.president,
    cId: req.body.cId,
  });
  ksbpres
    .save()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-ksbgenvotes", (req, res) => {
  const ksbgensec = new KsbGenSec({
    Ksbgensec: req.body.Ksbgensec,
    cId: req.body.cId,
  });
  ksbgensec
    .save()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-ksbfinvotes", (req, res) => {
  const ksbfinsec = new KsbFinSec({
    Ksbfinsec: req.body.Ksbfinsec,
    cId: req.body.cId,
  });
  ksbfinsec
    .save()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-ksborgvotes", (req, res) => {
  const ksborgsec = new KsbOrgSec({
    Ksborgsec: req.body.Ksborgsec,
    cId: req.body.cId,
  });
  ksborgsec
    .save()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-ksbwocomtvotes", (req, res) => {
  const ksbwocoms = new KsbWocomTotal({
    Ksbwocom: req.body.Ksbwocom,
    cId: req.body.cId,
  });
  ksbwocoms
    .save()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
});

//GET SMS
app.get("/sms-presidents", (req, res) => {
  SmsPresident.find({})
    .then((SmsPdata) => {
      res.send(SmsPdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/sms-gensec", (req, res) => {
  SmsGeneralSecretary.find({})
    .then((SmsGdata) => {
      res.send(SmsGdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/sms-finsec", (req, res) => {
  SmsFinancialSecretary.find({})
    .then((SmsFdata) => {
      res.send(SmsFdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/sms-orgsec", (req, res) => {
  SmsOrganisingSecretary.find({})
    .then((SmsFdata) => {
      res.send(SmsFdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/sms-wocom", (req, res) => {
  SmsWocom.find({})
    .then((SmsWdata) => {
      res.send(SmsWdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

//POST SMS TOTAL VOTES
app.post("/send-smspresvotes", (req, res) => {
  const smspres = new SmsPres({
    president: req.body.president,
    cId: req.body.cId,
  });
  smspres
    .save()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-smsgenvotes", (req, res) => {
  const smsgensec = new SmsGenSec({
    Smsgensec: req.body.Smsgensec,
    cId: req.body.cId,
  });
  smsgensec
    .save()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-smsfinvotes", (req, res) => {
  const smsfinsec = new SmsFinSec({
    Smsfinsec: req.body.Smsfinsec,
    cId: req.body.cId,
  });
  smsfinsec
    .save()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-smsorgvotes", (req, res) => {
  const smsorgsec = new SmsOrgSec({
    Smsorgsec: req.body.Smsorgsec,
    cId: req.body.cId,
  });
  smsorgsec
    .save()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-smswocomtvotes", (req, res) => {
  const smswocoms = new SmsWocomTotal({
    Smswocom: req.body.Smswocom,
    cId: req.body.cId,
  });
  smswocoms
    .save()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
});


//count individual votes
app.get("/PresidentVotes", (req, res) => {
  President.countDocuments({president: "101" }, function (err, results) {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
});

app.get("/FinSecVotes", (req, res) => {
  Finsec.countDocuments({finsec: "103" }, function (err, results) {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
});

app.get("/GenSecVotes", (req, res) => {
  Gensec.countDocuments({gensec: "101" }, function (err, results) {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
});

app.get("/WocomVotes", (req, res) => {
  Wocom.countDocuments({wocom: "101" }, function (err, results) {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
});