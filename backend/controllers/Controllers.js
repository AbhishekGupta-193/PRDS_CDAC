import User from "../models/user.js";

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({ email, password });

    const user = await User.findOne({ email });

    if (user) {
      if (password === user.password) {
        res.send({ status: 200, message: "Login Successful", user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred");
  }
};

export const updateRequest = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      user.request = !user.request;
      await user.save();
      res.json(user);
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

export const getRequests = async (req, res) => {
  try {
    const users = await User.find({ request: true });
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const submitSelfAppraisal = async (req, res) => {
  const { empId } = req.body;
  console.log(empId, "empid");
  try {
    const user = await User.findOneAndUpdate({ empId }, req.body, {
      new: true,
    });

    if (user) {
      res.send({ msg: "successfully registered", user });
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

export const submitAparForm = async (req, res) => {
  const { empId } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { empId },
      { $set: { APAR_status: true, ...req.body } },
      { new: true }
    );

    if (user) {
      res.send({ msg: "successfully registered" });
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

export const submitEvalutaionForm = async (req, res) => {
  const { userName } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOneAndUpdate(
      { userName: "xyz" },
      req.body,
      {
        new: true,
      }
    );

    if (user) {
      res.send({ msg: "successfully registered", user });
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};
