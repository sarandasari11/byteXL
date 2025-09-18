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

  const student1 = new Student("Saran", 20, "Computer Science");
  const teacher1 = new Teacher("Mr. Jagjit Singh", 30, "Full Stack");

  const people = [student1, teacher1];

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

      <div style={{ width: "350px" }}>
        {people.map((p, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              margin: "10px 0",
              textAlign: "left",
            }}
          >
            {p.getInfo()}
          </div>
        ))}
      </div>
    </div>
  );
}
