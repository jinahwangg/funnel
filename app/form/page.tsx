"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Shield } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

interface FormData {
  restaurantName: string
  city: string
  interestedServices: string[]
  currentPOS: string
  biggestChallenge: string
  selectedTimeSlot: string
  contactEmail: string
  acceptPrivacy: boolean
}

export default function FormPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    restaurantName: "",
    city: "",
    interestedServices: [],
    currentPOS: "",
    biggestChallenge: "",
    selectedTimeSlot: "",
    contactEmail: "",
    acceptPrivacy: false,
  })

  const serviceOptions = [
    { id: "pos", label: "POS system (credit card processing fees)" },
    { id: "kiosk", label: "Kiosk" },
    { id: "delivery", label: "Delivery/Takeout Website" },
    { id: "marketing", label: "Marketing & Advertising" },
    { id: "consultation", label: "Not sure (need consultation)" },
  ]

  const challengeOptions = [
    { id: "staff", label: "Staff shortage / High labor cost" },
    { id: "efficiency", label: "Order/Payment efficiency" },
    { id: "delivery", label: "Lack of delivery sales" },
    { id: "marketing", label: "Ineffective marketing" },
  ]

  const generateTimeSlots = () => {
    const slots = []
    const today = new Date()
    let daysAdded = 0
    const currentDate = new Date(today)

    while (daysAdded < 5) {
      currentDate.setDate(today.getDate() + daysAdded + 1)
      const dayOfWeek = currentDate.getDay()

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        const dateStr = currentDate.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        })

        slots.push({
          id: `${currentDate.toISOString().split("T")[0]}-10:00`,
          label: `${dateStr} - 10:00 AM`,
          date: new Date(currentDate),
        })

        slots.push({
          id: `${currentDate.toISOString().split("T")[0]}-14:00`,
          label: `${dateStr} - 2:00 PM`,
          date: new Date(currentDate),
        })

        slots.push({
          id: `${currentDate.toISOString().split("T")[0]}-16:00`,
          label: `${dateStr} - 4:00 PM`,
          date: new Date(currentDate),
        })
      }
      daysAdded++
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interestedServices: checked
        ? [...prev.interestedServices, serviceId]
        : prev.interestedServices.filter((id) => id !== serviceId),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.restaurantName || !formData.city || !formData.selectedTimeSlot || !formData.contactEmail) {
      alert("Please fill in all required fields")
      return
    }

    if (!formData.acceptPrivacy) {
      alert("Please accept the privacy policy to continue")
      return
    }

    setIsSubmitting(true)

    try {
      const airtableData = {
        "Restaurant Name": formData.restaurantName,
        City: formData.city,
        "Interested Services": formData.interestedServices.join(", "),
        "Current POS": formData.currentPOS,
        "Biggest Challenge": formData.biggestChallenge,
        "Selected Time": formData.selectedTimeSlot,
        "Contact Email": formData.contactEmail,
        Created: new Date().toISOString(),
      }

      console.log("Saving to Airtable:", airtableData)

      const selectedSlot = timeSlots.find((slot) => slot.id === formData.selectedTimeSlot)
      if (selectedSlot) {
        const calendarEvent = {
          summary: `Free Consultation with ${formData.restaurantName}`,
          description: `Restaurant: ${formData.restaurantName}\nCity: ${formData.city}\nServices: ${formData.interestedServices.join(", ")}\nChallenge: ${formData.biggestChallenge}`,
          start: {
            dateTime: selectedSlot.date.toISOString(),
            timeZone: "America/New_York",
          },
          end: {
            dateTime: new Date(selectedSlot.date.getTime() + 30 * 60000).toISOString(),
            timeZone: "America/New_York",
          },
          attendees: [{ email: formData.contactEmail }],
        }

        console.log("Creating Google Calendar event:", calendarEvent)
      }

      await new Promise((resolve) => setTimeout(resolve, 2000))

      router.push(
        `/confirmation?time=${encodeURIComponent(formData.selectedTimeSlot)}&restaurant=${encodeURIComponent(formData.restaurantName)}`
      )
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error booking your consultation. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <style jsx>{`
        @keyframes checkmark {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes checkbox-bounce {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        
        @keyframes radio-ripple {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .animated-checkbox[data-state="checked"] {
          animation: checkbox-bounce 0.3s ease-in-out;
        }
        
        .animated-checkbox[data-state="checked"]::after {
          animation: checkmark 0.3s ease-in-out;
        }
        
        .animated-radio[data-state="checked"] {
          position: relative;
        }
        
        .animated-radio[data-state="checked"]::before {
          content: '';
          position: absolute;
          inset: -4px;
          border: 2px solid rgba(234, 88, 12, 0.3);
          border-radius: 50%;
          animation: radio-ripple 0.6s ease-out;
        }
        
        .submit-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .submit-button:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(234, 88, 12, 0.3);
        }
        
        .submit-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s;
        }
        
        .submit-button:hover::before {
          left: 100%;
        }
        
        .privacy-box {
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        
        .privacy-box:hover {
          border-color: rgba(234, 88, 12, 0.2);
          background: rgba(234, 88, 12, 0.02);
        }
      `}</style>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" onClick={() => router.push("/")} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tell Us About Your Restaurant</h1>
            <p className="text-lg text-gray-600">
              Help us prepare for your consultation by sharing some details about your business.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Restaurant Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                  Restaurant Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="restaurantName">Restaurant Name *</Label>
                  <Input
                    id="restaurantName"
                    value={formData.restaurantName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, restaurantName: e.target.value }))}
                    placeholder="Enter your restaurant name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="city">City/Area *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                    placeholder="Enter your city or area"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Services Interest */}
            <Card>
              <CardHeader>
                <CardTitle>What services are you interested in?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {serviceOptions.map((service) => (
                    <div key={service.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={service.id}
                        checked={formData.interestedServices.includes(service.id)}
                        onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                        className="animated-checkbox"
                      />
                      <Label htmlFor={service.id} className="text-sm font-normal cursor-pointer">
                        {service.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current POS */}
            <Card>
              <CardHeader>
                <CardTitle>Current POS System</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.currentPOS}
                  onChange={(e) => setFormData((prev) => ({ ...prev, currentPOS: e.target.value }))}
                  placeholder="Tell us about your current POS system (optional)"
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Biggest Challenge */}
            <Card>
              <CardHeader>
                <CardTitle>What's your biggest challenge? *</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.biggestChallenge}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, biggestChallenge: value }))}
                >
                  {challengeOptions.map((challenge) => (
                    <div key={challenge.id} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={challenge.id} 
                        id={challenge.id} 
                        className="animated-radio"
                      />
                      <Label htmlFor={challenge.id} className="text-sm font-normal cursor-pointer">
                        {challenge.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Time Slots */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-orange-600" />
                  Select Your Preferred Time *
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.selectedTimeSlot}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, selectedTimeSlot: value }))}
                >
                  <div className="grid gap-3">
                    {timeSlots.map((slot) => (
                      <div key={slot.id} className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={slot.id} 
                          id={slot.id} 
                          className="animated-radio"
                        />
                        <Label htmlFor={slot.id} className="text-sm font-normal cursor-pointer">
                          {slot.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Privacy Policy */}
            <Card className="privacy-box">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="privacy"
                    checked={formData.acceptPrivacy}
                    onCheckedChange={(checked) => 
                      setFormData((prev) => ({ ...prev, acceptPrivacy: checked as boolean }))
                    }
                    className="animated-checkbox mt-1"
                    required
                  />
                  <div className="flex-1">
                    <Label htmlFor="privacy" className="text-sm font-normal cursor-pointer leading-relaxed">
                      <div className="flex items-start space-x-2">
                        <Shield className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span>
                          I accept the{" "}
                          <Link 
                            href="/privacy-policy" 
                            className="text-orange-600 hover:text-orange-700 underline font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Privacy Policy
                          </Link>{" "}
                          and agree to receive communications about my consultation. *
                        </span>
                      </div>
                    </Label>
                    <p className="text-xs text-gray-500 mt-2 ml-6">
                      We respect your privacy and will only use your information to provide the requested consultation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="submit-button w-full bg-orange-600 hover:bg-orange-700 text-white py-4 text-lg font-semibold"
              disabled={isSubmitting || !formData.acceptPrivacy}
            >
              {isSubmitting ? "Booking Your Consultation..." : "Book Free Consultation"}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              By booking, you agree to receive a confirmation email and calendar invitation.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}