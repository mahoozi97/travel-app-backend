const Travel = require("./travel.model");
const sendNotificationEmail = require("../utils/mailer");

// for sending notifications FCM
const admin = require("../utils/FirebaseAdmin");

const postATravel = async (req, res) => {
  try {
    const newTravel = await Travel({ ...req.body });
    await newTravel.save();

    res.status(200).send({
      message: "Travel posted successfully",
      travel: newTravel,
    });

    // for sending notifications FCM
    if (newTravel.withNotification === true) {
      const message = {
        notification: {
          title: `${newTravel.alertTitle}`,
          body: `${newTravel.alertMessage}`,
        },
        topic: "allUsers",
        android: {
          notification: {
            sound: "default",
          },
        },
        apns: {
          payload: {
            aps: {
              sound: "default",
            },
          },
        },
      };

      admin.messaging().send(message);
    }
    // send to email
    sendNotificationEmail(
      "تمت إضافة رحلة جديدة",
      `AgencyName: ${newTravel.agencyName}\nDestination: ${newTravel.destination}\nPostDate: ${newTravel.postDate}\nImage: ${newTravel.image}\nDates: ${newTravel.dates}\nExpireDate: ${newTravel.expireDate}`
    );
  } catch (error) {
    console.error("Error creating travel:", error);
    res.status(500).send({ message: "Failed to create travel" });
  }
};

const getAllTravels = async (req, res) => {
  try {
    const travels = await Travel.find().sort({ createdAt: -1 });
    res.status(200).send(travels);
  } catch (error) {
    console.error("Error fetching travels", error);
    res.status(500).send({ message: "Failed to fetch travels" });
  }
};

const getSingleTravel = async (req, res) => {
  try {
    const { id } = req.params;
    const travel = await Travel.findById(id);
    if (!travel) {
      res.status(404).send({ message: "Travel not found" });
    }
    res.status(200).send(travel);
  } catch (error) {
    console.error("Error fetching travel", error);
    res.status(500).send({ message: "Failed to fetch travel" });
  }
};

const updateTravel = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTravel = await Travel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTravel) {
      res.status(404).send({ message: "Travel is not found" });
    }
    res
      .status(200)
      .send({ message: "travel updated successfully", travel: updatedTravel });

    // for sending notifications FCM
    if (updatedTravel.withNotification === true) {
      const message = {
        notification: {
          title: `${updatedTravel.alertTitle}`,
          body: `${updatedTravel.alertMessage}`,
        },
        topic: "allUsers",
        android: {
          notification: {
            sound: "default",
          },
        },
        apns: {
          payload: {
            aps: {
              sound: "default",
            },
          },
        },
      };

      admin.messaging().send(message);
    }
  } catch (error) {
    console.error("Error updating a travel", error);
    res.status(500).send({ message: "Failed to update a travel" });
  }
};

const deleteATravel = async (req, res) => {
  try {
    const { id } = req.params; // get id
    const deletedTravel = await Travel.findByIdAndDelete(id);
    if (!deletedTravel) {
      res.status(404).send({ message: "Travel is not found" });
    }
    res
      .status(200)
      .send({ message: "Travel deleted successfully", travel: deletedTravel });

    // Email notification
    sendNotificationEmail(
      "تم حذف هذه الرحلة:",
      `AgencyName: ${deletedTravel.agencyName}\nDestination: ${deletedTravel.destination}\nPostDate: ${deletedTravel.postDate}\nImage: ${deletedTravel.image}\nDates: ${deletedTravel.dates}\nExpireDate: ${deletedTravel.expireDate}`
    );
  } catch (error) {
    console.error("error deleting a travel", error);
    res.status(500).send({ message: "Failed to delete a travel" });
  }
};

module.exports = {
  postATravel,
  getAllTravels,
  getSingleTravel,
  updateTravel,
  deleteATravel,
};
