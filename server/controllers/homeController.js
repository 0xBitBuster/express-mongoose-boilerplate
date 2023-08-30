/**
 * API Status
 * @route   GET /api/status
 * @access  Public
 */
exports.status = (req, res, next) => {
    return res.json({ ok: true, msg: "API is operational." });
};
