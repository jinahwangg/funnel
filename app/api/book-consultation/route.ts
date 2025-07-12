import { type NextRequest, NextResponse } from "next/server"
import { saveToAirtable, createCalendarEvent, formatFormDataForAirtable, formatCalendarEvent } from "@/lib/integrations"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Validate required fields
    if (!formData.restaurantName || !formData.city || !formData.contactEmail || !formData.selectedTimeSlot) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Parse the selected time slot
    const [date, time] = formData.selectedTimeSlot.split("-")
    const selectedDate = new Date(date)

    // Set the correct time
    if (time === "10:00") {
      selectedDate.setHours(10, 0, 0, 0)
    } else if (time === "14:00") {
      selectedDate.setHours(14, 0, 0, 0)
    } else if (time === "16:00") {
      selectedDate.setHours(16, 0, 0, 0)
    }

    const timeSlot = { date: selectedDate }

    // Save to Airtable
    const airtableData = formatFormDataForAirtable(formData)
    await saveToAirtable(airtableData)

    // Create Google Calendar event
    const calendarEvent = formatCalendarEvent(formData, timeSlot)
    await createCalendarEvent(calendarEvent)

    return NextResponse.json({
      success: true,
      message: "Consultation booked successfully",
      appointmentTime: formData.selectedTimeSlot,
    })
  } catch (error) {
    console.error("Error booking consultation:", error)
    return NextResponse.json({ error: "Failed to book consultation. Please try again." }, { status: 500 })
  }
}
