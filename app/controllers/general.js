exports.home = (req, res) => {
  return res.status(200).json({
    status: "OK",
    message: "ping successfully",
  });
};

exports.noPage = (req, res) => {
  return res.status(404).json({
    status: "Failed",
    message: "404 Page Not Found",
  });
};
