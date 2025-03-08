const Dashboard = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      message: "Welcome to the dashboard!",
      data: {
        user: {
          _id: user._id,
          email: user.email,
        },
      },
      error: null,
    });
  } catch (error) {
    console.error("Error in dashboard controller:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      data: null,
      error: {
        message: error.message,
      },
    });
  }
};

export default Dashboard;
