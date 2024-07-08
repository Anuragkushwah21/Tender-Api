const TenderModel = require("../model/tender");
class AdminController {
  static tenderinsert = async (req, res) => {
    try {
      // console.log(req.body)

      const { name, description, startTime, endTime, bufferTime } = req.body;

      if (name && description && startTime && endTime && bufferTime) {
        const result = new TenderModel({
          name: name,
          description: description,
          startTime: startTime,
          endTime: endTime,
          bufferTime: bufferTime,
        });
        await result.save();
        res.status(201).json({
          status: "SUCCESS",
          message: "Tender SUCCESSFULLY POST",
        });
      } else {
        res
          .status(401)
          .json({ status: "failed", message: "ALL FIELDS ARE REQUIRED" });
      }
      // console.log(req.body)
    } catch (error) {
      res.status(400).json({ status: "failed", message: error });
    }
  };
  static tenderDisplay = async (req, res) => {
    try {
      const data = await TenderModel.find();
      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
    }
  };
  static tenderDelete = async (req, res) => {
    try {
      const id = req.params.id;
      const AdminTender = await TenderModel.findById(id);
      if (!AdminTender) {
        return res.status(404).json({
          status: "failed",
          message: "User not Found 🐧🐧 ",
        });
      }
      await TenderModel.findByIdAndDelete(id);
      res.status(200).json({
        status: "success",
        message: "Tender delete successfully 🐧🐧 ",
        AdminTender,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static getSingleTender = async (req, res) => {
    try {
      const tender = await TenderModel.findById(req.params.id);
      if (!tender) return res.status(404).json({ message: "Tender not found" });
      res.json(tender);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  // Update a tender
  static tenderUpdate = async (req, res) => {
    try {
      const { name, description, startTime, endTime, bufferTime } = req.body;
      const updatedTender = await TenderModel.findByIdAndUpdate(
        req.params.id,
        { name, description, startTime, endTime, bufferTime },
        { new: true }
      );
      if (!updatedTender)
        return res.status(404).json({ message: "Tender not found" });
      res.json(updatedTender);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  static getTenderById = async (req, res) => {
    try {
      const tender = await TenderModel.findById(req.params.id);
      if (!tender) {
        return res.status(400).json({ message: "Tender not found" });
      }
      res.status(200).json(tender);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ status: "failed", message: error.message });
    }
  };
}

module.exports = AdminController;
