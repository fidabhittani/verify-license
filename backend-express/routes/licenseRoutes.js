
const express  =  require('express')

const  License = require('../models/license');

const router = express.Router();

// Add a new license
router.post('/', async (req, res) => {
  try {
    const license = new License(req.body);
    await license.save();
    res.status(201).json(license);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a license by license number
router.get('/:licenseNumber', async (req, res) => {
  try {
    const license = await License.findOne({ licenseNumber: req.params.licenseNumber });
    if (!license) return res.status(404).json({ error: 'License not found' });
    res.json(license);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a license
router.put('/:id', async (req, res) => {
  try {
    const updatedLicense = await License.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLicense) return res.status(404).json({ error: 'License not found' });
    res.json(updatedLicense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a license
router.delete('/:id', async (req, res) => {
  try {
    const deletedLicense = await License.findByIdAndDelete(req.params.id);
    if (!deletedLicense) return res.status(404).json({ error: 'License not found' });
    res.json({ message: 'License deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
