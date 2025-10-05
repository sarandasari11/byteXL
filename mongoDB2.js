const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb://127.0.0.1:27017/studentDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ DB connection error:", err));

app.use("/students", studentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


//studentRoutes

const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
router.post("/", studentController.createStudent);
router.get("/", studentController.getStudents);
router.get("/:id", studentController.getStudentById);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);
module.exports = router;

//Student.js
const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Student name is required"],
    trim: true
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [1, "Age must be greater than 0"]
  },
  course: {
    type: String,
    required: [true, "Course is required"],
    trim: true
  }
}, { timestamps: true });
module.exports = mongoose.model("Student", studentSchema);
