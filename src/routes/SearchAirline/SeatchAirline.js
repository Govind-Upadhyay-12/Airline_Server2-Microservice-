import express from "express";
import axios from "axios";
import UserSchema from "../../models/User.js";
const router = express.Router();
import client from "../../redisclient/redisclient.js";
router.get("/getAllAirports", async (req, res) => {
  console.log("data aara h");
  try {
    const response = await axios.get(
      `http://localhost:3001/api/use/getAirline`
    );
    const data = response.data;
    if (response.data && typeof response.data === "object") {
      console.log(data);
      return res.status(200).json(data);
    } else {
      console.error(`Request failed with status code ${response.status}`);
      return res.status(response.status).send({
        message: `Request failed with status code ${response.status}`,
      });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).send({ message: "Internal Server Error" });
  }
});

//id2-->airplane ki id h
//id-->user ki id h

router.post("/bookAirline/:id/:id2", async (req, res) => {
  console.log(req.body);
  try {
    const { id } = req.params;
    const { seat } = req.body;
    const { id2 } = req.params;
    const response = await axios.post(
      `http://localhost:3001/api/use/bookFlight`,
      {
        id,
        seat,
        id2,
      }
    );

    if (response.status == 200) {
      return res.status(200).send({ message: "confirm booking" });
    } else {
      return res.status(500).send({ message: "Internal server occur" });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).send({ message: error });
  }
});
//@id1-->user ki id hai
//@id2->flght ki id hai
router.post("/confirm_ticket/:id1/:id2", async (req, res) => {
  try {
    const { id1, id2,email } = req.params; // Use req.params to get parameters from the URL
    const response = await axios.post("http://localhost:3001/api/use/confirm", {
      id1,
      id2,
      email

    });

    if (response.status === 200) {
      try {
        const user = await UserSchema.findById(id1);

        if (!user) {
          return res.status(404).send({ message: "User not found." });
        }

        if (
          Array.isArray(user.BookedFlight) &&
          user.BookedFlight.includes(id2)
        ) {
          return res.status(400).send({ message: "Flight already booked." });
        }

        user.BookedFlight.push(id2);
        await user.save();

        return res
          .status(200)
          .send({ message: "Congratulations, flight booked!" });
      } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal server error." });
      }
    } else {
      return res
        .status(response.status)
        .send({ message: "Failed to confirm ticket." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error." });
  }
});
export default router;
