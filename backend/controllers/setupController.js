import Setup from '../models/Setup.js';

/**
 * Get Setup Details
 */
export const getSetup = async (req, res) => {
  try {
    const setup = await Setup.findOne();
    if (!setup) return res.status(404).json({ message: 'Setup details not found.' });
    res.json(setup);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching setup details', error });
  }
};

/**
 * Update or Create Setup Details
 */
export const updateSetup = async (req, res) => {
  try {
    const {
      brandName,
      themeColor,
      annualTargetStudents,
      annualTargetIncome,
      twitter,
      instagram,
      youtube,
      whatsappNumber,
      landline,
      email,
      address,
      aboutUs,
    } = req.body;

    // Process uploaded files
    const logo = req.files?.logo ? req.files.logo[0].filename : undefined;
    const sliders = req.files?.sliders?.map((file) => file.filename) || [];

    // Fetch existing setup or create new
    let setup = await Setup.findOne();
    if (setup) {
      // Update existing setup
      setup.brandName = brandName || setup.brandName;
      setup.themeColor = themeColor || setup.themeColor;
      setup.annualTargetStudents = annualTargetStudents || setup.annualTargetStudents;
      setup.annualTargetIncome = annualTargetIncome || setup.annualTargetIncome;

      setup.socialMediaLinks = {
        twitter: twitter || setup.socialMediaLinks.twitter,
        instagram: instagram || setup.socialMediaLinks.instagram,
        youtube: youtube || setup.socialMediaLinks.youtube,
      };

      setup.contactInfo = {
        whatsappNumber: whatsappNumber || setup.contactInfo.whatsappNumber,
        landline: landline || setup.contactInfo.landline,
        email: email || setup.contactInfo.email,
        address: address || setup.contactInfo.address,
      };

      setup.aboutUs = aboutUs || setup.aboutUs;
      if (logo) setup.logo = logo;
      if (sliders.length > 0) setup.sliders.push(...sliders);

      await setup.save();
    } else {
      // Create new setup
      setup = new Setup({
        brandName,
        themeColor,
        annualTargetStudents,
        annualTargetIncome,
        socialMediaLinks: { twitter, instagram, youtube },
        contactInfo: { whatsappNumber, landline, email, address },
        aboutUs,
        logo,
        sliders,
      });
      await setup.save();
    }

    res.json({ message: 'Setup updated successfully', setup });
  } catch (error) {
    res.status(500).json({ message: 'Error saving setup details', error });
  }
};
