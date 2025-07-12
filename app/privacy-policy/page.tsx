"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, Lock, Eye, Mail, Phone, Database } from "lucide-react"
import { useRouter } from "next/navigation";
export default function PrivacyPolicyPage() {
    const router = useRouter();
  
    const handleBackClick = () => {
    router.push('/form')  
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" onClick={handleBackClick} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Form
            </Button>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We value your privacy and are committed to protecting your personal information. 
                This policy explains how we collect, use, and safeguard your data.
              </p>
              
              <p className="text-sm text-gray-500 mt-4">
                Last updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>

          {/* Privacy Policy Content */}
          <div className="space-y-6">
            
            {/* Information We Collect */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Database className="w-6 h-6 mr-3 text-orange-600" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Personal Information</h4>
                  <p className="text-gray-700 leading-relaxed">
                    When you book a consultation, we collect personal information such as your restaurant name, 
                    city/area, contact email, and business details. This information is necessary to provide 
                    you with our consultation services.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Business Information</h4>
                  <p className="text-gray-700 leading-relaxed">
                    We collect information about your restaurant's current systems, challenges, and service 
                    interests to better prepare for your consultation and provide tailored recommendations.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Technical Information</h4>
                  <p className="text-gray-700 leading-relaxed">
                    We may collect technical information such as your IP address, browser type, and device 
                    information to improve our website's functionality and user experience.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Eye className="w-6 h-6 mr-3 text-orange-600" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>To schedule and conduct your free consultation</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>To prepare personalized recommendations for your restaurant</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>To send you confirmation emails and calendar invitations</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>To follow up on your consultation and provide additional resources</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>To improve our services and website functionality</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Lock className="w-6 h-6 mr-3 text-orange-600" />
                  Information Sharing & Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">We Do Not Sell Your Information</h4>
                  <p className="text-gray-700 leading-relaxed">
                    We never sell, rent, or trade your personal information to third parties for marketing purposes.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Limited Sharing</h4>
                  <p className="text-gray-700 leading-relaxed">
                    We may share your information only in the following circumstances:
                  </p>
                  <ul className="mt-2 ml-4 space-y-1 text-gray-700">
                    <li>• With service providers who help us deliver our consultation services</li>
                    <li>• When required by law or to protect our legal rights</li>
                    <li>• With your explicit consent</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Data Security</h4>
                  <p className="text-gray-700 leading-relaxed">
                    We implement appropriate security measures to protect your personal information against 
                    unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Shield className="w-6 h-6 mr-3 text-orange-600" />
                  Your Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  You have the right to:
                </p>
                <ul className="space-y-2 text-gray-700 ml-4">
                  <li>• Access the personal information we have about you</li>
                  <li>• Request correction of inaccurate information</li>
                  <li>• Request deletion of your personal information</li>
                  <li>• Opt out of marketing communications</li>
                  <li>• Withdraw consent for data processing</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Database className="w-6 h-6 mr-3 text-orange-600" />
                  Data Retention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  We retain your personal information only as long as necessary to provide our services 
                  and fulfill the purposes described in this policy. Typically, we retain consultation 
                  information for up to 2 years to provide follow-up services and support.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 shadow-lg bg-orange-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-white">
                  <Mail className="w-6 h-6 mr-3" />
                  Contact Us About Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="opacity-90 leading-relaxed">
                  If you have questions about this Privacy Policy or want to exercise your rights, 
                  please contact us:
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5" />
                    <span className="font-semibold">privacy@restaurantgrowth.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5" />
                    <span className="font-semibold">(555) 123-4567</span>
                  </div>
                </div>
                
                <p className="text-sm opacity-80 mt-4">
                  We will respond to your privacy requests within 30 days.
                </p>
              </CardContent>
            </Card>

            {/* Policy Updates */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Policy Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. Any changes will be posted on 
                  this page with an updated "Last modified" date. We encourage you to review this 
                  policy periodically to stay informed about how we protect your information.
                </p>
              </CardContent>
            </Card>

          </div>

          {/* Footer Actions */}
          <div className="mt-12 text-center space-y-4">
            <Button onClick={handleBackClick} size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
              I Understand - Back to Form
            </Button>
            
            <p className="text-sm text-gray-500">
              By using our services, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}