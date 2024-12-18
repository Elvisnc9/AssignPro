const express = require('express');
const Staff = require('../models/staff');
const router = express.Router();
const generateRoster = require('../utl/generator')


router.post('/add', async (req, res) => {
     const { name, role } = req.body;1
     if (!name || !role) {
          return res.status(400).json({ message: 'Name and role are required' });
     }
     try {
          const newStaff = await Staff.create({ name, role });
          return res.status(201).json({ staff: newStaff });
     } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Server error' });
     }
});


router.get('/', async (req, res) => {
     try {
          const staffList = await Staff.findAll();
          return res.status(200).json({ staff: staffList });
     } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Server error' });
     }
});


const areDaysIdentical = (newDays, lastMonthDays) => {
  return JSON.stringify(newDays) === JSON.stringify(lastMonthDays);
};

router.post('/generate', async (req, res) => {
  try {
    const staff = await Staff.findAll();
    
    
    for (const member of staff) {
      let assignedDays;
      let retries = 5; 
      const lastMonthDays = member.assignedDays || []; 

      do {
        
        assignedDays = generateRoster(member.role);

     
        retries--;
      } while (areDaysIdentical(assignedDays, lastMonthDays) && retries > 0);

     
      member.assignedDays = assignedDays;
      await member.save();
    }

    res.status(200).json({ message: 'Roster generated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating roster', error });
  }
});



router.delete('/:id', async (req, res) => {
     const { id } = req.params;
   
     if (!id) {
       return res.status(400).json({ message: 'User ID is required' });
     }
   
     try {
       const user = await Staff.findByPk(id);
   
       if (!user) {
         return res.status(404).json({ message: 'User not found' });
       }
   
       await user.destroy();
   
       return res.status(200).json({ message: 'User deleted successfully' });
     } catch (error) {
       console.error(error);
       return res.status(500).json({ message: 'Server error', error });
     }
   });
   
   module.exports = router;