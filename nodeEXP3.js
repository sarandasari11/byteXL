const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let seats = {};
for (let i = 1; i <= 10; i++) {
  seats[i] = { status: "available", lockExpires: null, lockedBy: null };
}

app.get("/seats", (req, res) => {
  const seatStatus = {};
  for (let id in seats) {
    seatStatus[id] = { status: seats[id].status };
  }
  res.status(200).json(seatStatus);
});

app.post("/lock/:id", (req, res) => {
  const seatId = parseInt(req.params.id);
  const seat = seats[seatId];

  if (!seat) {
    return res.status(404).json({ message: "Seat not found" });
  }
  
  if (seat.status === "booked") {
    return res.status(400).json({ message: `Seat ${seatId} is already booked` });
  }

  if (seat.status === "locked") {
    if (Date.now() > seat.lockExpires) {
      seat.status = "available";
      seat.lockExpires = null;
      seat.lockedBy = null;
    } else {
      return res.status(400).json({ message: `Seat ${seatId} is currently locked` });
    }
  }

  seat.status = "locked";
  seat.lockedBy = "user"; 
  seat.lockExpires = Date.now() + 60 * 1000; 

  setTimeout(() => {
    if (seat.status === "locked" && Date.now() > seat.lockExpires) {
      seat.status = "available";
      seat.lockExpires = null;
      seat.lockedBy = null;
      console.log(`Seat ${seatId} lock expired`);
    }
  }, 61 * 1000);

  res.status(200).json({
    message: `Seat ${seatId} locked successfully. Confirm within 1 minute.`,
  });
});

app.post("/confirm/:id", (req, res) => {
  const seatId = parseInt(req.params.id);
  const seat = seats[seatId];

  if (!seat) {
    return res.status(404).json({ message: "Seat not found" });
  }

  if (seat.status !== "locked") {
    return res.status(400).json({ message: "Seat is not locked and cannot be booked" });
  }

  seat.status = "booked";
  seat.lockExpires = null;
  seat.lockedBy = null;

  res.status(200).json({ message: `Seat ${seatId} booked successfully!` });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
