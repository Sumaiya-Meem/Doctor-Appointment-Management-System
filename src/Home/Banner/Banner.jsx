
import bannerImage from '../../assets/images/cover.png'; 
import { MdOutlineFileDownload } from "react-icons/md";

const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-[#cc9bfd] to-[#fefef4] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-4 ">
          
          {/* Image Content */}
          <div className="md:w-1/2 flex justify-center mr-3">
            <div className="rounded-xl overflow-hidden ">
              <img 
                src={bannerImage} 
                alt="Healthcare Platform" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Platform You Want Without Waiting.
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Connect with trusted healthcare professionals anytime, anywhere. Get appointments, consultations, and care at your fingertips—simple, fast, and reliable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="bg-[#dfb311] text-white py-3 px-6 rounded-lg font-medium ">
                Book Appointment
              </button>
              <button className="border border-[#dfb311] text-black py-3 px-6 rounded-lg font-bold hover:bg-blue-50 flex items-center gap-2">
                  <MdOutlineFileDownload className='text-xl font-bold'/>
                Learn More
              </button>
            </div>
            
            <div className="border-t border-gray-300 my-8"></div>
            
            <div className="flex gap-10">
              <div className="text-center">
                <div className="text-3xl font-bold ">27K+</div>
                <div className="text-gray-500 mt-1">Cured Patients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold ">9K+</div>
                <div className="text-gray-500 mt-1">Active Patients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;