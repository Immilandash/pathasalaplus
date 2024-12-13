export const updateSetup = async (req, res) => {
    try {
      const { adminId } = req.user; // Assuming authenticated admin's ID is available
      const setup = await Setup.findOne();
  
      if (!setup) {
        // First-time setup allowed
        const newSetup = new Setup(req.body);
        await newSetup.save();
        return res.json({ message: 'Setup created successfully', setup: newSetup });
      }
  
      // Check if permission is required
      if (setup.requiresPermission && setup.requestStatus !== 'approved') {
        return res.status(403).json({ message: 'Permission required to modify setup.' });
      }
  
      // Update setup if permitted
      setup.set(req.body);
  
      // Reset permissions after successful update
      setup.lastModifiedBy = adminId;
      setup.requiresPermission = true; // Require permission for further updates
      setup.requestStatus = null; // Reset request status
      await setup.save();
  
      res.json({ message: 'Setup updated successfully', setup });
    } catch (error) {
      res.status(500).json({ message: 'Error saving setup details', error });
    }
  };
  