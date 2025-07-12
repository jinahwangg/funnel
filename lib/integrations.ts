// Configuration for external integrations
// Replace these with your actual credentials

export const AIRTABLE_CONFIG = {
  API_KEY: "YOUR_AIRTABLE_API_KEY", // Replace with your Airtable API key
  BASE_ID: "YOUR_AIRTABLE_BASE_ID", // Replace with your Airtable base ID
  TABLE_NAME: "Consultations", // Replace with your table name
}

export const GOOGLE_CALENDAR_CONFIG = {
  API_KEY: "YOUR_GOOGLE_CALENDAR_API_KEY", // Replace with your Google Calendar API key
  CALENDAR_ID: "primary", // Use 'primary' or your specific calendar ID
  CLIENT_ID: "YOUR_GOOGLE_CLIENT_ID", // For OAuth if needed
  CLIENT_SECRET: "YOUR_GOOGLE_CLIENT_SECRET", // For OAuth if needed
}

// Airtable integration function
export async function saveToAirtable(data: any) {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_CONFIG.BASE_ID}/${AIRTABLE_CONFIG.TABLE_NAME}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_CONFIG.API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: data,
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.statusText}`)
    }

    const result = await response.json()
    console.log("Successfully saved to Airtable:", result)
    return result
  } catch (error) {
    console.error("Error saving to Airtable:", error)
    throw error
  }
}

// Google Calendar integration function
export async function createCalendarEvent(eventData: any) {
  try {
    // This is a simplified version - in production, you'd need proper OAuth
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${GOOGLE_CALENDAR_CONFIG.CALENDAR_ID}/events?key=${GOOGLE_CALENDAR_CONFIG.API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // In production, you'd use OAuth token: 'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(eventData),
      },
    )

    if (!response.ok) {
      throw new Error(`Google Calendar API error: ${response.statusText}`)
    }

    const result = await response.json()
    console.log("Successfully created calendar event:", result)
    return result
  } catch (error) {
    console.error("Error creating calendar event:", error)
    throw error
  }
}

// Helper function to format form data for Airtable
export function formatFormDataForAirtable(formData: any) {
  return {
    "Restaurant Name": formData.restaurantName,
    City: formData.city,
    "Contact Email": formData.contactEmail,
    "Interested Services": formData.interestedServices.join(", "),
    "Current POS": formData.currentPOS || "Not specified",
    "Biggest Challenge": formData.biggestChallenge,
    "Selected Time Slot": formData.selectedTimeSlot,
    "Submission Date": new Date().toISOString(),
    Status: "Scheduled",
  }
}

// Helper function to format calendar event
export function formatCalendarEvent(formData: any, timeSlot: any) {
  const startTime = new Date(timeSlot.date)
  const endTime = new Date(startTime.getTime() + 30 * 60000) // 30 minutes later

  return {
    summary: `Free Consultation - ${formData.restaurantName}`,
    description: `Restaurant Consultation Details:
    
Restaurant: ${formData.restaurantName}
City: ${formData.city}
Contact: ${formData.contactEmail}
Services of Interest: ${formData.interestedServices.join(", ")}
Current POS: ${formData.currentPOS || "Not specified"}
Main Challenge: ${formData.biggestChallenge}

This is a free 30-minute consultation to discuss digital marketing and growth strategies.`,
    start: {
      dateTime: startTime.toISOString(),
      timeZone: "America/New_York",
    },
    end: {
      dateTime: endTime.toISOString(),
      timeZone: "America/New_York",
    },
    attendees: [{ email: formData.contactEmail, displayName: formData.restaurantName }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 }, // 24 hours before
        { method: "popup", minutes: 30 }, // 30 minutes before
      ],
    },
  }
}
