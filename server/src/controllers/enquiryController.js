import Enquiry from "../models/Enquiry.js";

/**
 * @desc    Create a new enquiry
 * @route   POST /api/enquiries
 * @access  Public
 */
export const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message, vehicleId, vehicleName } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required",
      });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone: phone || "",
      message,
      vehicleId: vehicleId || null,
      vehicleName: vehicleName || "",
      status: "New",
    });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: enquiry,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get all enquiries
 * @route   GET /api/enquiries
 * @access  Admin
 */
export const getEnquiries = async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Enquiry.countDocuments(filter);
    const enquiries = await Enquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate("vehicleId", "title slug images");

    res.status(200).json({
      success: true,
      count: enquiries.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: enquiries,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get single enquiry
 * @route   GET /api/enquiries/:id
 * @access  Admin
 */
export const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id).populate(
      "vehicleId",
      "title slug images"
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update enquiry status
 * @route   PATCH /api/enquiries/:id/status
 * @access  Admin
 */
export const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = [
      "New",
      "Contacted",
      "Test drive",
      "Negotiation",
      "Closed",
    ];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete enquiry
 * @route   DELETE /api/enquiries/:id
 * @access  Admin
 */
export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    await enquiry.deleteOne();

    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
