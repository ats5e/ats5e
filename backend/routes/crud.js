const express = require('express');
const router = express.Router();
const models = require('../models');
const auth = require('../middleware/auth');

// Helper to get the correct model
const getModel = (modelName) => {
  const validModels = {
    'solutions': models.Solution,
    'case-studies': models.CaseStudy,
    'insights': models.Insight,
    'team-members': models.TeamMember,
    'partners': models.Partner,
    'home-page': models.HomePage
  };
  return validModels[modelName];
};

const validatePayload = (modelName, payload) => {
  if (modelName === 'insights' && !String(payload.bodyContent || '').trim()) {
    return 'Insights require body content.';
  }

  if (modelName === 'insights' && !String(payload.downloadFileUrl || '').trim()) {
    return 'Insights require a downloadable PDF.';
  }

  return null;
};

// GET all items for a model
router.get('/:model', async (req, res) => {
  try {
    const Model = getModel(req.params.model);
    if (!Model) return res.status(404).json({ msg: 'Model not found' });
    
    const query = {};
    const items = await Model.find(query).sort({ displayOrder: 1, createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET a single item by slug or ID
router.get('/:model/:id', async (req, res) => {
  try {
    const Model = getModel(req.params.model);
    if (!Model) return res.status(404).json({ msg: 'Model not found' });
    
    let item;
    // Check if ID is a valid ObjectId, otherwise treat it as a slug
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      item = await Model.findById(req.params.id);
    } else if (Model.schema.paths.slug) {
      item = await Model.findOne({ slug: req.params.id });
    }
    
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Protected routes inside router
router.use(auth);

// POST create an item
router.post('/:model', async (req, res) => {
  try {
    const Model = getModel(req.params.model);
    if (!Model) return res.status(404).json({ msg: 'Model not found' });

    const validationError = validatePayload(req.params.model, req.body);
    if (validationError) return res.status(400).json({ msg: validationError });
    
    const newItem = new Model(req.body);
    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT update an item
router.put('/:model/:id', async (req, res) => {
  try {
    const Model = getModel(req.params.model);
    if (!Model) return res.status(404).json({ msg: 'Model not found' });

    const validationError = validatePayload(req.params.model, req.body);
    if (validationError) return res.status(400).json({ msg: validationError });
    
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE an item
router.delete('/:model/:id', async (req, res) => {
  try {
    const Model = getModel(req.params.model);
    if (!Model) return res.status(404).json({ msg: 'Model not found' });
    
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
