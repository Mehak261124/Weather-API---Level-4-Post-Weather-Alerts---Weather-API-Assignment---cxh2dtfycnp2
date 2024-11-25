const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

/*
  Instructions for students:
  Implement the function to post weather alerts.

  Route:
    POST /alerts

  Input:
    - req.body = {city, humidity, date}

  Output:
    - If the alert is posted successfully, send a JSON response with the following structure and a status code of 200:
      {
        "status": "success",
        "message": "Weather alert saved successfully",
        
      }

    - If some error occurs, send a JSON response with the following structure and a status code of 404:
      {
        "status": "error",
        "message": "Failed to save weather alert"
        "error": "Error Message"
      }

  Tips:
    - You can use the provided saveWeatherAlert to handle the business logic of posting weather alerts.
    - Use the provided weatherController.saveWeatherAlert() function to post the alertData.
    - Handle any errors that occur during the posting process.
    - Return the appropriate success or error message based on the outcome.
*/



// Level 4: Post Weather Alerts
router.post('/alerts', async (req, res) => {
  const { city, date, humidity } = req.body;
  if (!city || !date || !humidity) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing required fields: city, date, or humidity',
    });
  }

  const alertDetails = { city, date, humidity };

  try {
    const result = await weatherController.saveWeatherAlert(alertDetails);

    if (result.success) {
      return res.status(200).json({
        status: 'success',
        message: 'Weather alert saved successfully',
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'Failed to save weather alert',
        error: result.error,
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: 'error',
      message: 'Failed to save weather alert',
      error: error.message,
    });
  }
});

module.exports = router;
