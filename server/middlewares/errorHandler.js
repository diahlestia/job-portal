function ErrorHandler(err, req, res, next) {
    switch (err.name) {
      case "InvalidUsernamePassword":
        res.status(400).json(err.msg);
        break;
      case "InvalidRegister":
        res.status(400).json(err.msg);
        break;
      case "InvalidStatusCode":
        res.status(403).json(err.msg);
        break;
  
      case "WrongUsernamePassword":
        res.status(403).json(err.msg);
        break;
      case "Unregistered":
        res.status(404).json(err.msg);
        break;
      case "Unauthorize":
        res.status(401).json(err.msg);
        break;
      case "AuthenticationError":
        res.status(403).json(err.msg);
        break;
      case "UsernameNotFound":
        res.status(404).json(err.msg);
        break;
      case "JwtNotProvided":
        res.status(500).json(err.msg);
        break;
      default:
        res.status(500).json({ message: err.msg });
        break;
    }
  }
  module.exports = ErrorHandler;