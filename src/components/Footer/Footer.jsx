import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 px-4 md:px-2">
      <div className="max-w-[95%] mx-auto">
        <div className="border-t border-[#d9d9db] my-8"></div>
        <div className="flex justify-between flex-col lg:flex-row gap-3">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#7c43bd] mb-4 italic">Medic+</h2>
            <p className="text-gray-600 max-w-md">
              Phasellus a nulla in neque lacinia posuere. Ettam auctor facilisis
              augue vel gravida.
            </p>
          </div>

          <div className="mb-10">
            <div className="grid grid-cols-3 gap-8">
              
              <div>
                  <div>
                  <h1 className="text-lg font-semibold text-[#7c43bd] mb-6 uppercase">Support</h1>
                  </div>
                  <div className="space-y-3">
                <a
                  href="#"
                  className="block text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="block text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Documentation
                </a>
                <a
                  href="#"
                  className="block text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Guides
                </a>
                <a
                  href="#"
                  className="block text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Community
                </a>
              </div>
              </div>
              
              <div>
                  <div>
                  <h1 className="text-lg font-semibold text-[#7c43bd] mb-6 uppercase">Solution</h1>
                  </div>
                  <div className="space-y-3">
                <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Marketing
                  </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Analytics
                  </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Commerce 
                  </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors"
              >Insights
              </a>
              </div>
              </div>

              <div>
                  <div>
                  <h1 className="text-lg font-semibold text-[#7c43bd] mb-6 uppercase">Company</h1>
                  </div>
                  <div className="space-y-3">
                <a
                  href="#"
                  className="block text-gray-600 hover:text-blue-600 transition-colors"
                >
                  About
                </a>
                <a
                  href="#"
                  className="block text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Blog
                </a>
                <a
                  href="#"
                  className="block text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Partners
                </a>
                <a
                  href="#"
                  className="block text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Jobs
                </a>
              </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#d9d9db] my-8"></div>

        {/* Newsletter Section */}
        <div className="mt-10 flex flex-col md:flex-row justify-between ">
          <div>
                  <h3 className="text-xl font-semibold text-[#7c43bd] mb-2">
            Join our newsletter
          </h3>
          <p className="text-gray-600 mb-6">
            Keep up to date with everything Medic+!
          </p>
          </div>

          <div>
                  <div className="flex flex-col md:flex-row  gap-4 max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-[#fbcb16] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbcb16]"
            />
            <button className="bg-[#fbcb16] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Join
            </button>
          </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
