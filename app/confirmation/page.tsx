"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, Calendar, Clock, Mail, Phone } from "lucide-react"

export default function ConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [appointmentDetails, setAppointmentDetails] = useState<{
    time: string
    restaurant: string
    formattedTime: string
  } | null>(null)

  useEffect(() => {
    const timeSlot = searchParams.get("time")
    const restaurantName = searchParams.get("restaurant")

    if (timeSlot && restaurantName) {
      // Parse the time slot to create a readable format
      const [date, time] = timeSlot.split("-")
      const dateObj = new Date(date)
      const timeStr = time === "10:00" ? "10:00 AM" : time === "14:00" ? "2:00 PM" : "4:00 PM"

      const formattedDate = dateObj.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      setAppointmentDetails({
        time: timeSlot,
        restaurant: restaurantName,
        formattedTime: `${formattedDate} at ${timeStr}`,
      })
    }
  }, [searchParams])

  if (!appointmentDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
          <p className="text-gray-600">Preparing your confirmation details.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Consultation Booked Successfully!</h1>

            <p className="text-lg text-gray-600">
              Thank you, {appointmentDetails.restaurant}! Your free consultation has been scheduled.
            </p>
          </div>

          {/* Appointment Details */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-orange-600" />
                Appointment Details
              </h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Date & Time</p>
                    <p className="text-gray-600">{appointmentDetails.formattedTime}</p>
                    <p className="text-sm text-gray-500">Duration: 30 minutes</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Calendar Invitation</p>
                    <p className="text-gray-600">We have sent you a calendar invitation via email</p>
                    <p className="text-sm text-gray-500">Please check your inbox and spam folder</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">How We'll Connect</p>
                    <p className="text-gray-600">Our team will call you at the scheduled time</p>
                    <p className="text-sm text-gray-500">Make sure your phone is available</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What to Expect */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What to Expect During Your Consultation</h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Business Assessment</p>
                    <p className="text-gray-600">
                      We'll review your current operations and identify opportunities for growth
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Customized Recommendations</p>
                    <p className="text-gray-600">
                      Get specific advice tailored to your restaurant's needs and challenges
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Action Plan</p>
                    <p className="text-gray-600">Leave with a clear roadmap for implementing improvements</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-8 border-0 shadow-lg bg-orange-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Need to Reschedule?</h2>
              <p className="mb-6 opacity-90">
                If you need to change your appointment time, please contact us at least 24 hours in advance.
              </p>
              <div className="space-y-2">
                <p className="font-semibold">Email: support@restaurantgrowth.com</p>
                <p className="font-semibold">Phone: (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <Button onClick={() => router.push("/")} size="lg" variant="outline" className="w-full md:w-auto">
              Back to Home
            </Button>

            <div className="text-sm text-gray-500">
              <p>We look forward to helping {appointmentDetails.restaurant} grow!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
