const express = require("express");
const user = require("./controllers/user");
const router = express.Router();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("../src/auth_config.json");

const LkMain = require("./controllers/lkmain");
const Climat = require("./controllers/climat");
const Microclmat = require("./controllers/microclimate");
const upload = require("./controllers/upload");
const ladder = require("./controllers/ladder");
const ladderuser = require("./controllers/userladder");
const comm = require("./controllers/comment");
const userinfo = require("./controllers/userinfo");

const manual = require("./controllers/manual");
const message = require("./controllers/message");
const admin = require("./controllers/adminpanel");
const box = require("./controllers/boxnameredact");
const raiting = require("./controllers/ratingphoto");
const gallery = require("./controllers/gallery");
const search = require("./controllers/search");
const adminuser = require("./controllers/admin");
const comp = require("./controllers/imagecomparison");

const deveice = require("./devicestatus");

const chat = require("./controllers/chat");

const multer = require("./middleware/upload");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
});

router.post("/login", checkJwt, user.userAuth);
router.post("/userdata", checkJwt, user.getUserData);

router.get("/rf", checkJwt, LkMain.rf);
router.get("/curtemp", checkJwt, LkMain.curtemp);
router.get("/curhumid", checkJwt, LkMain.curhumid);
router.get("/history", checkJwt, LkMain.history);

router.get("/gettobe", checkJwt, LkMain.gettobe);

router.get("/allplants", checkJwt, Climat.allphoto);
router.post("/adduserbox", checkJwt, Climat.addUserBox);
router.get("/boxrequest", checkJwt, Climat.boxrequest);
router.get("/choisehw", checkJwt, Climat.choisehw);
router.get("/choisehwget", checkJwt, Climat.choisehwget);
router.get("/choisehwplantget", checkJwt, Climat.choisehwplantget);

router.get("/getdevice", checkJwt, Microclmat.getdevice);
router.post("/addtobe", checkJwt, Microclmat.addtobe);
router.post("/settobe", checkJwt, multer.single("image"), Microclmat.settobe);
router.get("/deletetobe", checkJwt, Microclmat.deletetobe);

router.post(
  "/uploadavatar",
  checkJwt,
  multer.single("image"),
  upload.uploadavatar
);
router.post("/uploadname", checkJwt, multer.single("image"), upload.uploadname);

router.get("/getladder", checkJwt, multer.single("image"), ladder.getladder);
router.post(
  "/registerladder",
  checkJwt,
  multer.single("image"),
  ladder.registerladder
);

router.post(
  "/getladderuser",
  checkJwt,
  multer.single("image"),
  ladderuser.getladderuser
);
router.post(
  "/gettopladder",
  checkJwt,
  multer.single("image"),
  ladderuser.gettopladder
);

router.post("/addcomment", checkJwt, multer.single("image"), comm.addcomment);
router.post(
  "/getcommentbox",
  checkJwt,
  multer.single("image"),
  comm.getcommentbox
);

router.post(
  "/getuserinfo",
  checkJwt,
  multer.single("image"),
  userinfo.getuserinfo
);

router.post("/checkadmin", checkJwt, multer.single("image"), user.checkadmin);
router.post(
  "/usersmessage",
  checkJwt,
  multer.single("image"),
  message.usersmessage
);
router.post(
  "/messagesaveuserinfo",
  checkJwt,
  multer.single("image"),
  message.messagesaveuserinfo
);
router.post(
  "/messagesupport",
  checkJwt,
  multer.single("image"),
  message.messagesupport
);

router.post("/adminpanel", checkJwt, multer.single("image"), admin.adminpanel);
router.post(
  "/manualswift",
  checkJwt,
  multer.single("image"),
  admin.manualswift
);
router.post(
  "/manualswitchsheduler",
  checkJwt,
  multer.single("image"),
  manual.switch
);
router.post("/cf", checkJwt, multer.single("image"), admin.cf);
router.post(
  "/measuresheduler",
  checkJwt,
  multer.single("image"),
  admin.measuresheduler
);

router.post(
  "/boxnameredact",
  checkJwt,
  multer.single("image"),
  box.boxnameredact
);

router.post(
  "/ratingphotosheduler",
  checkJwt,
  multer.single("image"),
  raiting.ratingphotosheduler
);

router.post(
  "/ratingphotoshedulerupdate",
  checkJwt,
  multer.single("image"),
  raiting.ratingphotoshedulerupdate
);

router.post(
  "/galleryget",
  checkJwt,
  multer.single("image"),
  gallery.galleryget
);
router.post(
  "/gallerygetcount",
  checkJwt,
  multer.single("image"),
  gallery.gallerygetcount
);

router.post("/chatlogin", checkJwt, multer.single("image"), chat.chatlogin);
router.post("/searchuser", checkJwt, multer.single("image"), search.searchuser);
router.post(
  "/admindata",
  checkJwt,
  multer.single("image"),
  adminuser.admindata
);

router.post("/devicestatus", multer.single("image"), deveice.devicestatus);
router.post("/imagecomparison", multer.single("image"), comp.imagecomparison);
router.post(
  "/imagecomparisonid",
  multer.single("image"),
  comp.imagecomparisonid
);
router.post(
  "/imagecomparisonsave",
  multer.single("image"),
  comp.imagecomparisonsave
);

module.exports = router;
