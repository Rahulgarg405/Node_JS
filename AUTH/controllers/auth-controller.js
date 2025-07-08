const registerUser = async (req, res) => {
  try {
  } catch (error) {
    console.log("Some error occurred");
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
  } catch (error) {
    console.log("Some error occurred");
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

module.exports = { registerUser, loginUser };
