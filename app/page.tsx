"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Calendar, TrendingUp, Users, Utensils } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()

  const handleBookConsultation = () => {
    router.push("/form")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">

      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
              <Utensils className="w-8 h-8 text-orange-600" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Free Digital Marketing Consultation for <span className="text-orange-600">Restaurant Owners</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover how to increase your restaurant's revenue with online marketing, delivery integrations, modern
              POS systems, and proven growth strategies.
            </p>

            <Button
              onClick={handleBookConsultation}
              size="lg"
              className="animate-primary-cta bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl"
            >
              Book a Free Consultation
            </Button>

            <p className="text-sm text-gray-500 mt-4">
              ✓ 30-minute consultation ✓ No obligation ✓ Tailored recommendations
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="animate-float-card border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Increase Revenue</h3>
                <p className="text-gray-600">
                  Learn strategies to boost your restaurant's sales through digital channels and optimized operations.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-float-card border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Reduce Labor Costs</h3>
                <p className="text-gray-600">
                  Implement kiosks, online ordering, and automation to streamline operations and reduce staffing needs.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-float-card border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Guidance</h3>
                <p className="text-gray-600">
                  Get personalized recommendations from digital marketing experts who specialize in the restaurant
                  industry.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Social Proof */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">What Restaurant Owners Say</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-left">
                <p className="text-gray-600 italic mb-3">
                  "The consultation helped us implement online ordering that increased our revenue by 40% in just 3
                  months."
                </p>
                <p className="font-semibold text-gray-900">- Sarah Kim, Seoul Kitchen</p>
              </div>
              <div className="text-left">
                <p className="text-gray-600 italic mb-3">
                  "We reduced our credit card processing fees and improved our POS system. The savings paid for itself
                  immediately."
                </p>
                <p className="font-semibold text-gray-900">- Mike Chen, Dragon Palace</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-orange-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Grow Your Restaurant?</h3>
            <p className="text-lg mb-6 opacity-90">
              Book your free consultation now and discover the strategies that successful restaurants use to thrive.
            </p>
            <Button
              onClick={handleBookConsultation}
              size="lg"
              variant="secondary"
              className="animate-secondary-cta bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              Schedule My Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}