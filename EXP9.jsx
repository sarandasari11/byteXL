export default function App() {
  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    getInfo() {
      return `Name: ${this.name}, Age: ${this.age}`;
    }
  }

  class Student extends Person {
    constructor(name, age, course) {
      super(name, age);
      this.course = course;
    }
    getInfo() {
      return `${super.getInfo()}, Course: ${this.course}`;
    }
  }

  class Teacher extends Person {
    constructor(name, age, subject) {
      super(name, age);
      this.subject = subject;
    }
    getInfo() {
      return `${super.getInfo()}, Subject: ${this.subject}`;
    }
  }

  const student = new Student("Alice", 20, "Computer Science");
  const teacher = new Teacher("Mr. Smith", 40, "Math");

  return (
    <div
      style={{
        background: "#fff",
        color: "#000",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Person Class Hierarchy</h1>
      <p>{student.getInfo()}</p>
      <p>{teacher.getInfo()}</p>
    </div>
  );
}
