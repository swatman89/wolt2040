const indexR = require("./index");
const usersR = require("./users");
const studentsR = require("./students");
const foodR = require("./food");


exports.corsAccessControl = (app) => {
  // מאפשר לצד לקוח בדפדפן לעשות בקשות גם מדומיין
  // שלא קשור לדומיין של הצד השרת 
  // נניח מאקו יכול לעשות בקשה לוואלה
  app.all('*', function (req, res, next) {
    if (!req.get('Origin')) return next();
    // אם רוצים להגביל משנים את הכוכבית לדומיין או דומיינים
    // עם הפרדה של פסיקים
    res.set('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,auth-token');
    next();
  });
}

exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", usersR);
  app.use("/students", studentsR);
  app.use("/food",foodR);
  
// במקרה שמגיע לכתובת לא קיימת ייקבל 404
  app.use((req,res) => {
    res.status(404).json({msg:"404 url page not found"})
  })
}