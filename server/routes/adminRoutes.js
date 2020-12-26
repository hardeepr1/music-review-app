const express = require('express');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

function router() {
  return adminRouter;
}

module.exports = router;
