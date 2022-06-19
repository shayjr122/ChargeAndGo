const router = require("express").Router();

// Bring in the User Registration function
const {
  userAuth,
  checkRole,
  userLogin,
  userRegister,
  userDelete,
  serializeUser,
  userUpdate,
  getListUsers,
  userChangePassword,
  userBlock,
  block,
  userNotification,
} = require("../utils/Auth");

//#region Admin Routes
router.post(
  "/notification/:id",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    await userNotification(req.user._id, req.body.message, res);
  }
);
// blocking user
router.put("/block/:id", userAuth, block, async (req, res) => {
  await userBlock(userId, true, res);
});
router.put("/unblock/:id", userAuth, block, async (req, res) => {
  await userBlock(userId, false, res);
});
// Admin Registration Route
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});
// Admin Login Route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});
// Get Users List Route (Admin only)
router.get("/", userAuth, checkRole(["admin"]), async (req, res) => {
  await getListUsers(res);
});

router.delete("/:id", userAuth, checkRole(["admin"]), async (req, res) => {
  await userDelete(req.params.id, res);
});

//#endregion

//#region User Routes
// Users Registeration Route
router.post("/register-user", async (req, res) => {
  await userRegister(req.body, "user", res);
});
// Users Login Route
router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});
// Profile Route
router.get("/profile", userAuth, block, async (req, res) => {
  return res.json(serializeUser(req.user));
});
// Delete Route
router.delete("/delete", userAuth, block, async (req, res) => {
  await userDelete(req.user._id, res);
});
// Update Route
router.put("/update", userAuth, block, async (req, res) => {
  await userUpdate(req, res);
});
// Change Password Route
router.put("/change-password", userAuth, block, async (req, res) => {
  await userChangePassword(req, res);
});
//#endregion

module.exports = router;
